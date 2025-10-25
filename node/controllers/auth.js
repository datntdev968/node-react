const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
} = require("../validations/auth");
const {
	successResponse,
	errorResponse,
	paginateResponse,
} = require("../utils/response.js");
const { NOT_FOUND, FORBIDDEN } = require("../constants/statusCode.js");

// ✅ Viết hàm riêng tái sử dụng cho việc sinh access token
const generateToken = (userId, role) =>
	jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ✅ Hàm register
const register = asyncHandler(async (req, res) => {
	const { error } = registerSchema.validate(req.body);
	if (error) {
		return errorResponse(res, error.details[0].message, 422);
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

	const accessToken = generateToken(user._id, user.role);

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
		return errorResponse(res, error.details[0].message, 422);
	}

	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return errorResponse(res, "Email không tồn tại trên hệ thống!", 404);
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return errorResponse(res, "Mật khẩu không đúng!", 401);
	}

	if (user && !user.isAdmin())
		return errorResponse(
			res,
			"Bạn không có đủ thẩm quyền để truy cập vào trang quản trị!",
			FORBIDDEN
		);

	const accessToken = generateToken(user._id, user.role);

	return successResponse(
		res,
		{
			accessToken,
			user: {
				_id: user._id,
				full_name: user.full_name,
				email: user.email,
			},
		},
		"Đăng nhập thành công!"
	);
});

// ✅ Gửi mail quên mật khẩu
const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body || {};

	if (!email) {
		return errorResponse(res, "Email là bắt buộc!", 400);
	}

	const { error } = forgotPasswordSchema.validate(req.body);

	if (error) {
		return res.status(422).json({
			message: error.details[0].message,
		});
	}

	const user = await User.findOne({ email });
	if (!user) {
		return errorResponse(res, "Email không tồn tại!", 404);
	}

	// Kiểm tra nếu đã gửi gần đây (ví dụ trong 5 phút)
	if (user.resetPasswordToken && user.resetPasswordExpires > Date.now()) {
		const secondsLeft = Math.ceil(
			(user.resetPasswordExpires - Date.now()) / 1000
		);

		return errorResponse(
			res,
			`Bạn đã yêu cầu đặt lại mật khẩu gần đây. Vui lòng thử lại sau khoảng ${Math.ceil(
				secondsLeft / 60
			)} phút.`,
			429
		);
	}

	// Tạo token reset
	const resetToken = crypto.randomBytes(32).toString("hex");
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// Lưu token và thời gian hết hạn (15 phút)
	user.resetPasswordToken = resetPasswordToken;
	user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
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

	return successResponse(
		res,
		{},
		"Vui lòng kiểm tra email để đặt lại mật khẩu!"
	);
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
		return errorResponse(res, "Token không hợp lệ hoặc đã hết hạn!", 400);
	}

	// Kiểm tra mật khẩu mới có trùng với mật khẩu cũ không
	// const isSame = await bcrypt.compare(password, user.password);
	// if (isSame) {
	// 	return res.status(400).json({
	// 		message: "Mật khẩu mới không được trùng với mật khẩu hiện tại.",
	// 	});
	// }

	// Cập nhật mật khẩu
	user.password = password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	await user.save();

	return successResponse(res, {}, "Đặt lại mật khẩu thành công!");
});

const me = asyncHandler(async (req, res) => {
	const _id = req.user.id;

	const user = await User.findById(_id).select(
		"-password -resetPasswordExpires -resetPasswordToken"
	);

	if (!user) {
		return errorResponse(res, "Tài khoản không tồn tại trên hệ thống!", 404);
	}

	return successResponse(res, { user });
});


module.exports = {
	register,
	authenticate,
	forgotPassword,
	resetPassword,
	me,
};
