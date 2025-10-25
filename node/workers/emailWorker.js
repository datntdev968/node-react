const emailQueue = require("../queues/emailQueue");
const nodemailer = require("nodemailer");
require("dotenv").config();

emailQueue.process(async (job, done) => {
	const { to, subject, html } = job.data;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	await transporter.sendMail({
		from: '"Hệ thống" <no-reply@example.com>',
		to,
		subject,
		html,
	});

	done(); // Báo hoàn thành
});
