import Mail from "../Models/Mailing.js";

export const getMails = async (req, res) => {
	try {
		const mails = await Mail.find();
		res.status(200).json(mails);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createMail = async (req, res) => {
	const mail = req.body;
	const newMail = new Mail(mail);
	try {
		const savedMail = await newMail.save();
		res.status(201).json(savedMail);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};
