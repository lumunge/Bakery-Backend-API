import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Contact", ContactSchema);
