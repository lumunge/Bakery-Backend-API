import mongoose from "mongoose";

const MailingSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Mail", MailingSchema);
