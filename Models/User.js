import mongoose from "mongoose";
import shortid from "shortid";

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	_id: {
		type: String,
		default: shortid.generate,
	},
});

export default mongoose.model("User", UserSchema);
