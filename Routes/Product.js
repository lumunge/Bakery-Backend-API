import express from "express";
import { getProducts } from "../Controllers/Product.js";

const router = express.Router();

router.get("/", getProducts);

export default router;
