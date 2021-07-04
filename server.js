//Importing external modules
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import shortid from "shortid";
import dotenv from "dotenv";
import User from "./Models/User.js";
import withAuth from "./middleware.js";

// const User = require("./Models/User");
// const withAuth = require("./middleware");

// initialze app
const app = express();
app.use(bodyParser.json());

mongoose.connect(
	"mongodb://localhost/caroCakesDb",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("Database connected successfully")
);

// PRODUCTS API START
const Product = mongoose.model(
	"products",
	new mongoose.Schema({
		_id: { type: String, default: shortid.generate },
		title: String,
		description: String,
		image: String,
		price: Number,
		availableSizes: [String],
	})
);

// Get method
app.get("/api/products", async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});
// Posting method
app.post("/api/products", async (req, res) => {
	const newProduct = new Product(req.body);
	const savedProduct = await newProduct.save();
	res.send(savedProduct);
});
// Remove Method
app.delete("/api/products/:id", async (req, res) => {
	const deletedProduct = await Product.findByIdAndDelete(req.params.id);
	res.send(deletedProduct);
});

//   PRODUCTS API END

// ORDER MODEL
const Order = mongoose.model(
	"orders",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				default: shortid.generate,
			},
			email: String,
			name: String,
			phone: Number,
			address: String,
			decoration: String,
			total: Number,
			cartItems: [
				{
					_id: String,
					title: String,
					price: Number,
					count: Number,
				},
			],
		},
		{
			timestamps: true,
		}
	)
);

// ORDER CREATION API
app.post("/api/orders", async (req, res) => {
	// if(
	//     !req.body.name ||
	//     !req.body.email ||
	//     !req.body.phone ||
	//     !req.body.address ||
	//     !req.body.decoration ||
	//     !req.body.cartItems ||
	//     !req.body.total

	// ){
	//     return res.send({
	//         message: "Data is required before submission"
	//     });
	// }
	const order = await Order(req.body).save();
	res.send(order);
});

app.get("/api/orders", async (req, res) => {
	const orders = await Order.find({});
	res.send(orders);
});

app.delete("/api/orders/:id", async (req, res) => {
	const order = await Order.findByIdAndDelete(req.params.id);
	res.send(order);
});
// END ORDER CREATION API

// CLIENTS MODEL
const MailingList = mongoose.model(
	"mailing-list",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				default: shortid.generate,
			},
			email: String,
		},
		{
			timestamps: true,
		}
	)
);
// CLIENTS API
app.post("/api/mailing-list", async (req, res) => {
	if (!req.body.email) {
		return res.send({
			message: "Please Enter your Email Address",
		});
	}
	const mail = await MailingList(req.body).save();
	res.send(mail);
});

app.get("/api/mailing-list", async (req, res) => {
	const mail = await MailingList.find({});
	res.send(mail);
});

app.delete("/api/mailing-list/:id", async (req, res) => {
	const mail = await MailingList.findByIdAndDelete(req.params.id);
	res.send(mail);
});
// END CLIENTS API

// const port = process.env.PORT || 5000;
dotenv.config();
app.listen(process.env.PORT, () =>
	console.log(`Serving @ http://localhost:${process.env.PORT}`)
);

// CONTACT US MODEL
const Contact = mongoose.model(
	"contacts",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				default: shortid.generate,
			},
			name: String,
			phone: Number,
			email: String,
		},
		{
			timestamps: true,
		}
	)
);

//CONTACT API
app.post("/api/contact-info", async (req, res) => {
	if (!req.body.name || !req.body.phone || !req.body.email) {
		return res.send({
			message: "Your contact Information Is Required",
		});
	}
	const contact = await Contact(req.body).save();
	res.send(contact);
});
app.get("/api/contact-info", async (req, res) => {
	const contact = await Contact.find({});
	res.send(contact);
});
app.delete("/api/contact-info", async (req, res) => {
	const contact = await Contact.findByIdAndDelete(req.params.id);
	res.send(contact);
});
// END CONTACT API

//ADMIN REGISTRATION API
app.post("/api/register", (req, res) => {
	const { email, password } = req.body;
	const user = new User({ email, password });
	user.save((err) => {
		if (err) {
			console.log("This error Occured ", err);
			res.status(500).send("Error Occured Registering the New User");
		} else {
			res.status(200).send("Registration Was Successful!!");
		}
	});
});

app.get("/api/admin", async (req, res) => {
	const admins = await User.find({});
	res.send(admins);
});

app.post("/api/authenticate", function (req, res) {
	const { email, password } = req.body;
	User.findOne({ email }, function (err, user) {
		if (err) {
			console.log(err);
			res.status(500).json({
				error: "An Internal Error has Occured 001",
			});
		} else if (!user) {
			res.status(401).json({
				error: "Incorrect Email Or Password",
			});
		} else {
			user.isCorrectPassword(password, function (err, same) {
				if (err) {
					res.status(500).json({
						error: "Internal Error has Ocuurec 002",
					});
				} else if (!same) {
					res.status(401).json({
						error: "Incorrect Email Or Password 002",
					});
				} else {
					const payload = { email };
					const token = jwt.sign(payload, process.env.SECRET, {
						expiresIn: "1h",
					});
					res.cookie("token", token, { httpOnly: true }).sendStatus(
						200
					);
				}
			});
		}
	});
});

app.get("/checkToken", withAuth, function (req, res) {
	res.sendStatus(200);
});
//END ADMIN REG API
