import Order from "../Models/Order.js";

export const getOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createOrder = async (req, res) => {
	const order = req.body;
	const newOrder = new Order(order);
	try {
		const savedOrder = await newOrder.save();
		res.status(201).json(savedOrder);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};
