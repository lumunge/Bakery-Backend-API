import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET;

const withAuth = (req, res, next) => {
	const token =
		req.body.token ||
		req.query.token ||
		req.headers["x-access-token"] ||
		req.cookies.token;

	if (!token) {
		res.status(401).send("Unauthorized Beyond This Point");
		console.log("You Are Unauthorized");
	} else {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.status(401).send("Invalidity In The Token");
				console.log("Your Token Is Invalid");
			} else {
				req.email = decoded.email;
				next();
			}
		});
	}
};

export default withAuth;
