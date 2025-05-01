const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		// address: [{type: mongoose.Types.ObjectId, ref: 'Address'}] quan hệ
		refreshToken: {
			type: String,
		},
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	// Mã hóa mật khẩu
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//Export the model
module.exports = mongoose.model("User", userSchema);
