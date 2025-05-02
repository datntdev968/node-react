const isAdmin = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		return next(); // Cho phép truy cập
	}
	return res.status(403).json({
		message: "Bạn không có quyền truy cập tài nguyên này.",
	});
};

module.exports = isAdmin;
