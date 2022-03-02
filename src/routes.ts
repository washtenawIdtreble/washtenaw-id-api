import { Router } from "express";
import { handlePing } from "./controllers/ping";
import { handleCategoriesGet } from "./controllers/categories";

export const router = Router();

router.get("/ping", handlePing);
router.get("/categories", handleCategoriesGet);