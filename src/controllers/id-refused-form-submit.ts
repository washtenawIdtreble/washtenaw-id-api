import { RequestHandler } from "express";
import { buildEmailTransport } from "../utilities/email-transport";
import { ENV_KEYS } from "../utilities/environment";
import { HoneypotFormData } from "../utilities/types";

export type IdRefusedFormData = {
    name?: string;
    email?: string;
    phone?: string;
    businessName: string;
    businessStreet: string;
    businessCity: string;
    whenRefused?: string
    ageRange?: string;
    description?: string;
} & HoneypotFormData;

export const handleIdRefusedFormSubmit: RequestHandler = async (request, response) => {
    const formData: IdRefusedFormData = request.body;

    const businessNameError = !formData.businessName ? "<business name> " : "";
    const businessCityError = !formData.businessCity ? "<business city> " : "";
    const businessStreetError = !formData.businessStreet ? "<business street> " : "";
    if (businessNameError || businessCityError || businessStreetError) {
        response.status(400).send({ error: `The ${businessNameError}${businessCityError}${businessStreetError}is required. Please describe the issue you had and try again.` });
        return;
    }

    try {
        const transport = buildEmailTransport();

        let emailBody = `${formData.name || "Anonymous"}`;
        emailBody = `${emailBody} <${formData.email || "no email provided"}>`;
        emailBody = `${emailBody} <tel: ${formData.phone || "no phone number provided"}>`;
        emailBody = `${emailBody} <age: ${formData.ageRange || "no age range given"}>`;
        emailBody = `${emailBody}\n\nreports that ${formData.businessName}`;
        emailBody = `${emailBody} on ${formData.businessStreet}`;
        emailBody = `${emailBody} in ${formData.businessCity}`;
        emailBody = `${emailBody} refused the ID ${formData.whenRefused || "<no date or time given>"}.`;
        emailBody = `${emailBody}\n\n${formData.description || "<no details given>"}`;

        if (formData.honeypotValue !== "") {
            emailBody = `${emailBody}\n\nHoneypot: ${formData.honeypotValue}`;
            emailBody = `${emailBody}\nTime taken to fill out this form: ${formData.timeToFillForm}`;
            emailBody = `${emailBody}\nIP Address: ${request.headers["x-forwarded-for"]}`;
        }

        await transport.sendMail({
            to: process.env[ENV_KEYS.EMAIL_TO_CONTACT],
            subject: `Washtenaw ID Refused by ${formData.businessName}`,
            text: emailBody,
        });

        response.status(200).end();
    } catch (error) {
        response.status(500).send({ error: "Your report could not be sent, please try again later." });
    }
};
