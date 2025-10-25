const asyncHandler = require("express-async-handler");

const totalOrder = asyncHandler(async (req, res) => {
	return res.status(200).json({
		success: true,
		data: 10,
	});
});

module.exports = {
	totalOrder,
};
