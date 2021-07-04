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
