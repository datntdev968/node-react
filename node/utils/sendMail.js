const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const ejs = require("ejs");
const path = require("path");

const sendMail = asyncHandler(async (email, pathView, data, subject) => {
	const templatePath = path.join(__dirname, pathView);

	const htmlContent = await ejs.renderFile(templatePath, data);

	// Gửi mail
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: `${process.env.APP_NAME} <no-reply@example.com>`,
		to: email,
		subject,
		html: htmlContent,
	};

	await transporter.sendMail(mailOptions);
});

module.exports = sendMail;
