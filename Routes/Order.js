import express from "express";
import { getOrders, createOrder } from "../Controllers/Order.js";

const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

export default router;
