import { Router } from "express";
import { handlePing } from "./controllers/ping";
import { handleCategoriesGet } from "./controllers/categories";
import { handleBusinessesGet } from "./controllers/all-businesses";
import { handleAccessibilityFormSubmit } from "./controllers/accessibility-form-submit";

export const router = Router();

router.get("/ping", handlePing);
router.get("/categories", handleCategoriesGet);
router.get("/businesses", handleBusinessesGet);
router.post("/accessibility-issues", handleAccessibilityFormSubmit);