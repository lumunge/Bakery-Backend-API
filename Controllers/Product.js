import mongoose from "mongoose";
import Product from "../Models/Product.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body;
	const NewProduct = new Product(product);
	try {
		const savedProduct = await NewProduct.save();
		res.status(201).json(savedProduct);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateProduct = async (req, res) => {
	const { id: _id } = req.params;
	const product = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No product with that id");
	const updatedProduct = await Product.findByIdAndUpdate(
		_id,
		{ ...product, _id },
		{ new: true }
	);
	res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No product with that id");
	await Product.findByIdAndRemove(id);
	res.json({ message: "Product was Deleted Successfully" });
};
