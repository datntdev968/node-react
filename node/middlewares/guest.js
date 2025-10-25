const jwt = require("jsonwebtoken");

const guest = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		// Không có token → cho phép tiếp tục (chưa đăng nhập)
		return next();
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (decoded) {
			// Nếu verify được → đã đăng nhập → chặn
			return res
				.status(403)
				.json({
					message:
						"Bạn đã đăng nhập rồi, vui lòng tiếp tục với phiên làm việc của bạn!",
				});
		}
	} catch (error) {
		// Token không hợp lệ → cho qua
		return next();
	}
};
module.exports = guest;
