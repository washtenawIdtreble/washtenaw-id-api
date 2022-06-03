import { RequestHandler } from "express";
import { buildEmailTransport } from "../utilities/email-transport";
import { ENV_KEYS } from "../utilities/environment";

export type AccessibilityFormData = {
    name?: string
    email?: string
    phone?: string
    description: string
}

export const handleAccessibilityFormSubmit: RequestHandler = async (request, response) => {
    const formData: AccessibilityFormData = request.body;

    if (!formData.description) {
        response.status(400).send({ error: "The issue description is required. Please describe the issue you had and try again." });
        return;
    }

    try {
        const transport = buildEmailTransport();

        let emailBody = "Accessibility report from";
        emailBody = `${emailBody} ${formData.name || "Anonymous"}`;
        emailBody = `${emailBody} <${formData.email || "no email provided"}>`;
        emailBody = `${emailBody} <tel: ${formData.phone || "no phone number provided"}>`;
        emailBody = `${emailBody}\n\n${formData.description}`;

        await transport.sendMail({
            to: process.env[ENV_KEYS.EMAIL_TO_ACCESSIBILITY],
            subject: "Accessibility Issue Report",
            text: emailBody,
        });

        response.status(200).end();
    } catch (error) {
        response.status(500).send({ error: "Your report could not be sent, please try again later." });
    }
};