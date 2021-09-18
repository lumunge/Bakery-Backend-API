import mongoose from "mongoose";
import shortid from "shortid";

const OrderSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		mpesa: {
			type: String,
			required: true,
		},
		decoration: {
			type: String,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		cartItems: [
			{
				_id: {
					type: String,
					default: shortid.generate,
				},
				title: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				count: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Order", OrderSchema);
