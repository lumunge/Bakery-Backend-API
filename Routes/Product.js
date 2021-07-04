import express from "express";
import {
	getProducts,
	createProduct,
	deleteProduct,
} from "../Controllers/Product.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.post("/:id", deleteProduct);

export default router;
