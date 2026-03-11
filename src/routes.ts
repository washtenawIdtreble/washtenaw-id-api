import { Router } from "express";
import { handlePing } from "./controllers/ping";
import { handleAccessibilityFormSubmit } from "./controllers/accessibility-form-submit";
import { handleContactFormSubmit } from "./controllers/contact-form-submit";
import { handleIdRefusedFormSubmit } from "./controllers/id-refused-form-submit";

export const router = Router();

router.get("/ping", handlePing);
router.post("/accessibility-issues", handleAccessibilityFormSubmit);
router.post("/id-refused", handleIdRefusedFormSubmit);
router.post("/contact-us", handleContactFormSubmit);
