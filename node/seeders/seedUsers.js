const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/User"); // Đường dẫn đúng đến model của bạn
require("dotenv").config();

// Kết nối MongoDB
mongoose.connect(process.env.DBURI);

// Tạo 1 user fake
const createFakeUser = () => {
	return {
		full_name: faker.person.fullName(),
		email: faker.internet.email(),
		mobile: faker.phone.number("09########"),
		address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}`,
		password: "123456", // hoặc mã hoá bcrypt nếu cần
		createdAt: faker.date.past(),
	};
};

// Tạo nhiều user fake
const seedUsers = async (num = 10) => {
	await User.deleteMany(); // Xoá hết dữ liệu cũ nếu muốn

	const users = Array.from({ length: num }, () => createFakeUser());

	await User.insertMany(users);
	console.log(`${num} người dùng giả đã được tạo!`);
	process.exit();
};

seedUsers(5000); // 👈 Số lượng tùy ý
