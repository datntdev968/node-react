const Joi = require("joi");

const registerSchema = Joi.object({
	full_name: Joi.string().min(3).max(100).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(30).required(),
	mobile: Joi.string()
		.allow(null, "")
		.pattern(/^[0-9]{10,15}$/) // Chỉ chấp nhận số điện thoại có độ dài từ 10 đến 15 chữ số
		.messages({
			"string.pattern.base":
				"Số điện thoại không hợp lệ. Chỉ chấp nhận 10 đến 15 chữ số.",
			"string.empty": "Số điện thoại không được để trống.",
		}),
});

module.exports = {
	registerSchema,
};
