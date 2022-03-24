import { Router } from "express";
import { handlePing } from "./controllers/ping";
import { handleCategoriesGet } from "./controllers/categories";
import { handleBusinessesGet } from "./controllers/all-businesses";

export const router = Router();

router.get("/ping", handlePing);
router.get("/categories", handleCategoriesGet);
router.get("/businesses", handleBusinessesGet);