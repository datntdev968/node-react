const {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
} = require("../validations/auth");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

// ✅ Viết hàm riêng tái sử dụng cho việc sinh access token
const generateToken = (userId) =>
	jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ✅ Hàm register
const register = asyncHandler(async (req, res) => {
	const { error } = registerSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { email, password, full_name, mobile } = req.body;

	// Kiểm tra email đã tồn tại chưa
	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.status(409).json({ message: "Email đã được sử dụng." });
	}

	const user = await User.create(req.body);

	if (!user) {
		return res.status(500).json({
			success: false,
			message: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
		});
	}

	const accessToken = generateToken(user._id);

	return res.status(201).json({
		success: true,
		message: "Đăng ký thành công!",
		accessToken,
		user: {
			_id: user._id,
			full_name: user.full_name,
			email: user.email,
		},
	});
});

const authenticate = asyncHandler(async (req, res) => {
	const { error } = loginSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json({
			success: false,
			mes: "Email không tồn tại trên hệ thống!",
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(401).json({ message: "Mật khẩu không đúng." });
	}

	const accessToken = generateToken(user._id);

	return res.status(200).json({
		success: true,
		message: "Đăng nhập thành công!",
		accessToken,
		user: {
			_id: user._id,
			full_name: user.full_name,
			email: user.email,
		},
	});
});

// ✅ Gửi mail quên mật khẩu
const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body || {};

	if (!email) {
		return res.status(400).json({
			message: "Email là bắt buộc.",
		});
	}

	const { error } = forgotPasswordSchema.validate(req.body);

	if (error) {
		return res.status(422).json({
			message: error.details[0].message,
		});
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ message: "Email không tồn tại!" });
	}

	// Kiểm tra nếu đã gửi gần đây (ví dụ trong 5 phút)
	if (user.resetPasswordToken && user.resetPasswordExpires > Date.now()) {
		const secondsLeft = Math.ceil(
			(user.resetPasswordExpires - Date.now()) / 1000
		);
		return res.status(429).json({
			message: `Bạn đã yêu cầu đặt lại mật khẩu gần đây. Vui lòng thử lại sau khoảng ${Math.ceil(
				secondsLeft / 60
			)} phút.`,
		});
	}

	// Tạo token reset
	const resetToken = crypto.randomBytes(32).toString("hex");
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// Lưu token và thời gian hết hạn (15 phút)
	user.resetPasswordToken = resetPasswordToken;
	user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
	await user.save();

	const resetUrl = `${process.env.APP_URL_API}auth/reset-password/${resetToken}`;
	const pathView = "../views/emails/reset-password.ejs";
	const subject = "Quên mật khẩu";

	sendMail(
		email,
		pathView,
		{
			full_name: user.full_name,
			resetUrl,
		},
		subject
	);

	// await emailQueue.add({
	// 	to: email,
	// 	subject: "Khôi phục mật khẩu",
	// 	html: htmlContent,
	// });

	res.status(200).json({
		success: true,
		message: "Vui lòng kiểm tra email để đặt lại mật khẩu!",
	});
});

const resetPassword = asyncHandler(async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

	const user = await User.findOne({
		resetPasswordToken: hashedToken,
		resetPasswordExpires: { $gt: Date.now() },
	});

	if (!user) {
		return res
			.status(400)
			.json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
	}

	user.password = await bcrypt.hash(password, 10);
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	await user.save();

	res
		.status(200)
		.json({ success: true, message: "Đặt lại mật khẩu thành công!" });
});

module.exports = { register, authenticate, forgotPassword, resetPassword };
