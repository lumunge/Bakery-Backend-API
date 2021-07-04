import express from "express";
import { getMails, createMail } from "../Controllers/Mailing.js";

const router = express.Router();

router.get("/", getMails);

router.post("/", createMail);

export default router;
