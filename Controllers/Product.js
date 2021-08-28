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
	try {
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					title: req.params.title,
					description: req.params.description,
					image: req.params.image,
					price: req.params.price,
					availableSizes: req.params.availableSizes,
				},
			}
		);
		res.json(updatedProduct);
	} catch (error) {
		res.json({ message: error });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const deletedProduct = await Product.remove({ _id: req.params.id });
		res.json(deletedProduct);
	} catch (error) {
		res.json({ message: error });
	}
};
