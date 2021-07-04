import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.js";

// accessing environment variables
dotenv.config();

export const signUp = async (req, res) => {
	const { username, email, password, confirmPassword } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		//check for existing user
		if (existingUser)
			return res
				.status(400)
				.json({ message: "This email has been taken" });
		// match passwords
		if (password !== confirmPassword)
			return res.status(400).json({ message: "Passwords dont match" });

		//encrypt passwords
		const hashedPassword = await bcrypt.hash(password, 15);

		const ValidUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		// create token for user
		const token = jwt.sign(
			{ email: ValidUser.email, id: ValidUser._id },
			`${process.env.SECRET}`,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ ValidUser, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const logIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		// check if user exists
		if (!existingUser)
			return res.status(404).json({ message: "User does not exist" });
		// check if password is correct
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid Credentials" });

		// create a token for user
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			`${process.env.SECRET}`,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
