import express from "express";
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../Controllers/Product.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.patch("/:id", updateProduct);

router.post("/:id", deleteProduct);

export default router;
