const successResponse = (
	res,
	data = {},
	message = "Thành công",
	statusCode = 200
) => {
	return res.status(statusCode).json({
		success: true,
		message,
		...data,
	});
};

const errorResponse = (
	res,
	message = "Đã có lỗi xảy ra",
	statusCode = 500,
	errors = {}
) => {
	return res.status(statusCode).json({
		success: false,
		message,
		errors,
	});
};

const paginateResponse = (
	res,
	result,
	message = "Thành công",
	statusCode = 200
) => {
	const { docs, ...pagination } = result;

	return res.status(statusCode).json({
		success: true,
		message,
		data: docs,
		pagination,
	});
};

module.exports = {
	successResponse,
	errorResponse,
	paginateResponse,
};
