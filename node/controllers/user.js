const { NOT_FOUND } = require("../constants/statusCode");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { errorResponse, paginateResponse } = require("../utils/response");

const paginate = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const sort = req.query.sort || "createdAt";
	const order = req.query.order || "decs";

	const options = {
		page,
		limit,
		select: "-password -resetPasswordToken -resetPasswordExpires",
		sort: {
			[sort]: order === "asc" ? 1 : -1,
		},
	};

	const result = await User.paginate({}, options);

	if (!result.docs.length) {
		return errorResponse(res, "Không có bản ghi nào!", NOT_FOUND);
	}

	return paginateResponse(res, result);
});

module.exports = {
	paginate,
};
