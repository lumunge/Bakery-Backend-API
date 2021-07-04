import Contact from "../Models/Contact.js";

export const getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find();
		res.status(200).json(contacts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createContact = async (req, res) => {
	const contact = req.body;
	const newContact = new Contact(contact);
	try {
		const savedContact = await newContact.save();
		res.status(201).json(savedContact);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};
