const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");

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
			sparse: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			default: "customer",
		},
		address: String,
		// address: [{type: mongoose.Types.ObjectId, ref: 'Address'}] quan hệ
		refreshToken: {
			type: String,
		},
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.isAdmin = function () {
	return this.role === "admin";
};

userSchema.plugin(mongoosePaginate);

//Export the model
module.exports = mongoose.model("User", userSchema);
