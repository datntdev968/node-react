const { registerSchema } = require("../validations/user");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
	console.log(req.body);
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

	return res.status(201).json({ message: "Đăng ký thành công!", user: user });
});

// const login 

module.exports = { register };
