import { RequestHandler } from "express";
import { buildEmailTransport } from "../utilities/email-transport";
import { ENV_KEYS } from "../utilities/environment";
import { HoneypotFormData } from "../utilities/types";

export type ContactFormData = {
    name?: string
    email?: string
    phone?: string
    comments: string
} & HoneypotFormData;

export const handleContactFormSubmit: RequestHandler = async (request, response) => {
    const formData: ContactFormData = request.body;

    if (!formData.comments) {
        response.status(400).send({ error: "A message is required. Please add a message and try again." });
        return;
    }

    try {
        const transport = buildEmailTransport();

        let emailBody = "General contact from";
        emailBody = `${emailBody} ${formData.name || "Anonymous"}`;
        emailBody = `${emailBody} <${formData.email || "no email provided"}>`;
        emailBody = `${emailBody} <tel: ${formData.phone || "no phone number provided"}>`;
        emailBody = `${emailBody}\n\n${formData.comments}`;

        if (formData.honeypotValue !== "") {
            emailBody = `${emailBody}\n\nHoneypot: ${formData.honeypotValue}`;
            emailBody = `${emailBody}\nTime taken to fill out this form: ${formData.timeToFillForm}`;
            emailBody = `${emailBody}\nIP Address: ${request.headers["x-forwarded-for"]}`;
        }

        await transport.sendMail({
            to: process.env[ENV_KEYS.EMAIL_TO_CONTACT],
            subject: "Washtenaw ID General Contact",
            text: emailBody,
        });

        response.status(200).end();
    } catch (error) {
        response.status(500).send({ error: "Your message could not be sent, please try again later." });
    }
};
