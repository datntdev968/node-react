const mongoose = require("mongoose");

const ALLOWED_MODELS = [];

const getModel = (modelName) => {
	if (ALLOWED_MODELS.includes(modelName)) {
		throw new Error("Model không hợp lệ hoặc không được phép thao tác.");
	}
	return mongoose.model(modelName);
};

const deleteRecords = async (req, res) => {
	try {
		const { model, ids } = req.body;

		const Model = getModel(model);

		const query = Array.isArray(ids) ? { _id: { $in: ids } } : { _id: ids };
		const result = await Model.deleteMany(query);

		res.json({
			success: true,
			message: "Đã xoá thành công",
			deletedCount: result.deletedCount,
		});
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

const updateStatus = async (req, res) => {
	try {
		const { model, ids, status } = req.body;
		const Model = getModel(model);

		const query = Array.isArray(ids) ? { _id: { $in: ids } } : { _id: ids };
		const result = await Model.updateMany(query, { status });

		res.json({
			success: true,
			message: "Cập nhật trạng thái thành công",
			modifiedCount: result.modifiedCount,
		});
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

module.exports = {
	deleteRecords,
	updateStatus,
};
