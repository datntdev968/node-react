const notFound = (req, res, next) => {
	const error = new Error(`Route: ${req.originalUrl} not found!`);
	res.status(404);
	next(error);
};

const errHandler = (xhr, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	return res.status(statusCode).json({
		success: false,
		mes: xhr?.message,
	});
};

module.exports = {
	notFound,
	errHandler,
};
