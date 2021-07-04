import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductRoutes from "./Routes/Product.js";
import OrderRoutes from "./Routes/Order.js";
import MailingRoute from "./Routes/Mailing.js";
import ContactRoute from "./Routes/Contact.js";
import cors from "cors";
// import jwt from "jsonwebtoken";
// import shortid from "shortid";
// import User from "./Models/User.js";
// import withAuth from "./middleware.js";

// initialze app
const app = express();

// environment variables accessibility
dotenv.config();

// middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);
app.use("/emails", MailingRoute);
app.use("/contacts", ContactRoute);

// DATABASE CONFIG
const CONN_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Database Connection was Successfull"))
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server Running on Port: http://localhost:${PORT}`)
		)
	)
	.catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
// END DATABASE CONFIG

// CONTACT US MODEL
// const Contact = mongoose.model(
// 	"contacts",
// 	new mongoose.Schema(
// 		{
// 			_id: {
// 				type: String,
// 				default: shortid.generate,
// 			},
// 			name: String,
// 			phone: Number,
// 			email: String,
// 		},
// 		{
// 			timestamps: true,
// 		}
// 	)
// );

//CONTACT API
// app.post("/api/contact-info", async (req, res) => {
// 	if (!req.body.name || !req.body.phone || !req.body.email) {
// 		return res.send({
// 			message: "Your contact Information Is Required",
// 		});
// 	}
// 	const contact = await Contact(req.body).save();
// 	res.send(contact);
// });
// app.get("/api/contact-info", async (req, res) => {
// 	const contact = await Contact.find({});
// 	res.send(contact);
// });
// app.delete("/api/contact-info", async (req, res) => {
// 	const contact = await Contact.findByIdAndDelete(req.params.id);
// 	res.send(contact);
// });
// END CONTACT API

//ADMIN REGISTRATION API
// app.post("/api/register", (req, res) => {
// 	const { email, password } = req.body;
// 	const user = new User({ email, password });
// 	user.save((err) => {
// 		if (err) {
// 			console.log("This error Occured ", err);
// 			res.status(500).send("Error Occured Registering the New User");
// 		} else {
// 			res.status(200).send("Registration Was Successful!!");
// 		}
// 	});
// });

// app.get("/api/admin", async (req, res) => {
// 	const admins = await User.find({});
// 	res.send(admins);
// });

// app.post("/api/authenticate", function (req, res) {
// 	const { email, password } = req.body;
// 	User.findOne({ email }, function (err, user) {
// 		if (err) {
// 			console.log(err);
// 			res.status(500).json({
// 				error: "An Internal Error has Occured 001",
// 			});
// 		} else if (!user) {
// 			res.status(401).json({
// 				error: "Incorrect Email Or Password",
// 			});
// 		} else {
// 			user.isCorrectPassword(password, function (err, same) {
// 				if (err) {
// 					res.status(500).json({
// 						error: "Internal Error has Ocuurec 002",
// 					});
// 				} else if (!same) {
// 					res.status(401).json({
// 						error: "Incorrect Email Or Password 002",
// 					});
// 				} else {
// 					const payload = { email };
// 					const token = jwt.sign(payload, process.env.SECRET, {
// 						expiresIn: "1h",
// 					});
// 					res.cookie("token", token, { httpOnly: true }).sendStatus(
// 						200
// 					);
// 				}
// 			});
// 		}
// 	});
// });

// app.get("/checkToken", withAuth, function (req, res) {
// 	res.sendStatus(200);
// });
//END ADMIN REG API
