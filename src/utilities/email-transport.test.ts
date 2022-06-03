import { buildEmailTransport } from "./email-transport";
import { ENV_KEYS } from "./environment";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import mocked = jest.mocked;

jest.mock("nodemailer");

describe(buildEmailTransport.name, () => {
    const sendingEmail = "from@email.com";
    const emailPassword = "12345";

    beforeAll(() => {
        process.env[ENV_KEYS.EMAIL_SENDING_ACCOUNT] = sendingEmail;
        process.env[ENV_KEYS.EMAIL_PASSWORD] = emailPassword;
    });

    afterAll(() => {
        delete process.env[ENV_KEYS.EMAIL_SENDING_ACCOUNT];
        delete process.env[ENV_KEYS.EMAIL_PASSWORD];
    });

    test("returns a nodemailer transporter configured correctly", () => {
        const mockTransporter = { sendMail: jest.fn() } as unknown as nodemailer.Transporter;
        const expectedEmailConfig: SMTPTransport.Options = {
            service: "gmail",
            auth: {
                user: sendingEmail,
                pass: emailPassword,
            },
        };

        mocked(nodemailer.createTransport).mockReturnValue(mockTransporter);

        expect(buildEmailTransport()).toBe(mockTransporter);
        expect(nodemailer.createTransport).toHaveBeenCalledWith(expectedEmailConfig);
    });
});