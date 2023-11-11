import { AccessibilityFormData, handleAccessibilityFormSubmit } from "./accessibility-form-submit";
import request from "supertest";
import { app } from "../app";
import { stubAccessibilityFormData } from "../../test-helpers/test-factories";
import nodemailer from "nodemailer";
import { buildEmailTransport } from "../utilities/email-transport";
import { ENV_KEYS } from "../utilities/environment";
import mocked = jest.mocked;

jest.mock("../utilities/email-transport");

describe(handleAccessibilityFormSubmit.name, () => {
    let emailFormData: AccessibilityFormData;
    let emailTransport: nodemailer.Transporter;
    const accessibilityIssueEmail = "thedevs@wasthenawid.com";

    beforeAll(() => {
        process.env[ENV_KEYS.EMAIL_TO_ACCESSIBILITY] = accessibilityIssueEmail;
    });

    afterAll(() => {
        delete process.env[ENV_KEYS.EMAIL_TO_ACCESSIBILITY];
    });

    beforeEach(() => {
        emailFormData = stubAccessibilityFormData({
            name: "Henry Leroy Jennings",
            email: "lee@amideast.org",
            phone: "1234567890",
            comments: "The buttons are too close together!",
        });

        emailTransport = { sendMail: jest.fn() } as unknown as nodemailer.Transporter;
        mocked(buildEmailTransport).mockReturnValue(emailTransport);
    });

    test("sends form data to correct email address", async () => {
        const response = await request(app).post("/accessibility-issues")
            .type("json")
            .send(JSON.stringify(emailFormData));

        expect(emailTransport.sendMail).toHaveBeenCalledWith({
            to: accessibilityIssueEmail,
            subject: "Washtenaw ID Accessibility Issue Report",
            text: `Accessibility report from ${emailFormData.name} <${emailFormData.email}> <tel: ${emailFormData.phone}>\n\n${emailFormData.comments}`,
        });

        expect(response.statusCode).toEqual(200);
    });

    describe("when the user's name, email, or phone are missing", () => {
        test("sends the body of the email correctly", async () => {
            emailFormData.name = "";
            emailFormData.phone = "";
            emailFormData.email = "";

            const response = await request(app).post("/accessibility-issues")
                .type("json")
                .send(JSON.stringify(emailFormData));

            expect(emailTransport.sendMail).toHaveBeenCalledWith({
                to: accessibilityIssueEmail,
                subject: "Washtenaw ID Accessibility Issue Report",
                text: `Accessibility report from Anonymous <no email provided> <tel: no phone number provided>\n\n${emailFormData.comments}`,
            });

            expect(response.statusCode).toEqual(200);
        });
    });

    describe("when the issue description is missing", () => {
        let response: request.Response;

        beforeEach(async () => {
            emailFormData.comments = "";

            response = await request(app).post("/accessibility-issues")
                .type("json")
                .send(JSON.stringify(emailFormData));
        });

        test("responds with a bad request response", () => {
            expect(response.statusCode).toBe(400);
        });

        test("responds with a readable error message", () => {
            expect(JSON.parse(response.text).error).toEqual("The issue description is required. Please describe the issue you had and try again.");
        });

        test("an email is not sent", () => {
            expect(emailTransport.sendMail).not.toHaveBeenCalled();
        });
    });

    describe("when sending the email succeeds", () => {
        let response: request.Response;

        beforeEach(async () => {
            mocked(emailTransport.sendMail).mockResolvedValue(null);

            response = await request(app).post("/accessibility-issues")
                .type("json")
                .send(JSON.stringify(emailFormData));
        });

        test("responds with good status code", async () => {
            expect(response.statusCode).toBe(200);
        });
    });

    describe("when sending the email fails ", () => {
        let response: request.Response;

        beforeEach(async () => {
            mocked(emailTransport.sendMail).mockRejectedValue(new Error("sending the email failed"));

            response = await request(app).post("/accessibility-issues")
                .type("json")
                .send(JSON.stringify(emailFormData));
        });

        test("responds with server error", async () => {
            expect(response.statusCode).toBe(500);
        });

        test("responds with a readable error message", () => {
            expect(JSON.parse(response.text).error).toEqual("Your report could not be sent, please try again later.");
        });
    });

    describe("when creating the email transporter fails", () => {
        let response: request.Response;
        beforeEach(async () => {
            mocked(buildEmailTransport).mockImplementation(() => {
                throw new Error("Failed to build email transporter");
            });

            response = await request(app).post("/accessibility-issues")
                .type("json")
                .send(JSON.stringify(emailFormData));
        });

        test("responds with server error", async () => {
            expect(response.statusCode).toBe(500);
        });

        test("responds with a readable error message", () => {
            expect(JSON.parse(response.text).error).toEqual("Your report could not be sent, please try again later.");
        });
    });
});
