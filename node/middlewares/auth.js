const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Thiếu token truy cập." });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded; // Lưu thông tin user vào request
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: "Token không hợp lệ hoặc hết hạn." });
	}
};

module.exports = auth;
