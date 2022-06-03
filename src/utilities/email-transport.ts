import nodemailer from "nodemailer";
import { ENV_KEYS } from "./environment";

export const buildEmailTransport = (): nodemailer.Transporter => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env[ENV_KEYS.EMAIL_SENDING_ACCOUNT],
            pass: process.env[ENV_KEYS.EMAIL_PASSWORD],
        },
    });
};