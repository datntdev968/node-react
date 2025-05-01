const Joi = require("joi");

const registerSchema = Joi.object({
	full_name: Joi.string().min(3).max(100).required().messages({
		"string.empty": "Họ tên không được để trống.",
		"string.min": "Họ tên phải có ít nhất 3 ký tự.",
		"any.required": "Họ tên là bắt buộc.",
	}),
	email: Joi.string().email().required().messages({
		"string.empty": "Email không được để trống.",
		"string.email": "Email không đúng định dạng.",
		"any.required": "Email là bắt buộc.",
	}),
	password: Joi.string().min(6).max(30).required().messages({
		"string.empty": "Mật khẩu không được để trống.",
		"string.min": "Mật khẩu phải từ 6 ký tự trở lên.",
		"any.required": "Mật khẩu là bắt buộc.",
	}),
	mobile: Joi.string()
		.allow(null, "")
		.pattern(/^[0-9]{10,15}$/)
		.messages({
			"string.pattern.base":
				"Số điện thoại không hợp lệ. Chỉ chấp nhận 10 đến 15 chữ số.",
			"string.empty": "Số điện thoại không được để trống.",
		}),
});

const loginSchema = Joi.object({
	email: Joi.string().required().email(),
	password: Joi.string().min(6).max(30).required(),
});

const forgotPasswordSchema = Joi.object({
	email: Joi.string().required().email().messages({
		"string.empty": "Email không được để trống.",
		"string.email": "Email không đúng định dạng.",
		"any.required": "Email là bắt buộc.",
	}),
});

module.exports = {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
};
