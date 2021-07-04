import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductRoutes from "./Routes/Product.js";
import OrderRoutes from "./Routes/Order.js";
import MailingRoute from "./Routes/Mailing.js";
import ContactRoute from "./Routes/Contact.js";
import AuthRoutes from "./Routes/Auth.js";
import cors from "cors";

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
app.use("/auth", AuthRoutes);

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
