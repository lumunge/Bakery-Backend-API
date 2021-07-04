import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre("save", function (next) {
	if (this.isNew || this.isModified("password")) {
		const document = this;
		bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
			if (err) {
				next(err);
				console.log("An error has Occured in Hashing");
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

UserSchema.methods.isCorrectPassword = (password, callback) => {
	bcrypt.compare(password, this.password, (err, same) => {
		if (err) {
			callback(err);
		} else {
			callback(err, same);
		}
	});
};

export default mongoose.model("User", UserSchema);
