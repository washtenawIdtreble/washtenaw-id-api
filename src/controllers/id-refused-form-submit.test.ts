import request from "supertest";
import { app } from "../app";
import { stubIdRefusedFormData } from "../../test-helpers/test-factories";
import nodemailer from "nodemailer";
import { buildEmailTransport } from "../utilities/email-transport";
import { ENV_KEYS } from "../utilities/environment";
import { handleIdRefusedFormSubmit, IdRefusedFormData } from "./id-refused-form-submit";
import mocked = jest.mocked;

jest.mock("../utilities/email-transport");

describe(handleIdRefusedFormSubmit.name, () => {
    let emailFormData: IdRefusedFormData;
    let emailTransport: nodemailer.Transporter;
    const emailTo = "someone@wasthenawid.com";

    beforeAll(() => {
        process.env[ENV_KEYS.EMAIL_TO_CONTACT] = emailTo;
    });

    afterAll(() => {
        delete process.env[ENV_KEYS.EMAIL_TO_CONTACT];
    });

    beforeEach(() => {
        emailFormData = stubIdRefusedFormData();

        emailTransport = { sendMail: jest.fn() } as unknown as nodemailer.Transporter;
        mocked(buildEmailTransport).mockReturnValue(emailTransport);
    });

    test("sends form data to correct email address", async () => {
        const ipAddress = "123.456.1.1";
        const response = await request(app).post("/id-refused")
            .type("json")
            .set("x-forwarded-for", ipAddress)
            .send(JSON.stringify(emailFormData));

        expect(emailTransport.sendMail).toHaveBeenCalledWith({
            to: emailTo,
            subject: `Washtenaw ID Refused by ${emailFormData.businessName}`,
            text: `${emailFormData.name} <${emailFormData.email}> <tel: ${emailFormData.phone}> <age: ${emailFormData.ageRange}>

reports that ${emailFormData.businessName} on ${emailFormData.businessStreet} in ${emailFormData.businessCity} refused the ID ${emailFormData.whenRefused}.

${emailFormData.description}

Honeypot: ${emailFormData.honeypotValue}
Time taken to fill out this form: ${emailFormData.timeToFillForm}
IP Address: ${ipAddress}`,
        });

        expect(response.statusCode).toEqual(200);
    });

    describe("when the optional values are missing", () => {
        test("sends the body of the email correctly", async () => {
            emailFormData.name = "";
            emailFormData.phone = "";
            emailFormData.email = "";
            emailFormData.whenRefused = "";
            emailFormData.ageRange = "";
            emailFormData.description = "";
            emailFormData.honeypotValue = "";

            const response = await request(app).post("/id-refused")
                .type("json")
                .send(JSON.stringify(emailFormData));

            expect(emailTransport.sendMail).toHaveBeenCalledWith({
                to: emailTo,
                subject: `Washtenaw ID Refused by ${emailFormData.businessName}`,
                text: `Anonymous <no email provided> <tel: no phone number provided> <age: no age range given>

reports that ${emailFormData.businessName} on ${emailFormData.businessStreet} in ${emailFormData.businessCity} refused the ID <no date or time given>.

<no details given>`,
            });

            expect(response.statusCode).toEqual(200);
        });
    });

    describe("when the required fields are missing", () => {
        let response: request.Response;

        beforeEach(async () => {
            emailFormData.businessName = "";
            emailFormData.businessStreet = "";
            emailFormData.businessCity = "";

            response = await request(app).post("/id-refused")
                .type("json")
                .send(JSON.stringify(emailFormData));
        });

        test("responds with a bad request response", () => {
            expect(response.statusCode).toBe(400);
        });

        test("responds with a readable error message", () => {
            expect(JSON.parse(response.text).error).toEqual("The <business name> <business city> <business street> is required. Please describe the issue you had and try again.");
        });

        test("an email is not sent", () => {
            expect(emailTransport.sendMail).not.toHaveBeenCalled();
        });
    });

    describe("when sending the email fails ", () => {
        let response: request.Response;

        beforeEach(async () => {
            mocked(emailTransport.sendMail).mockRejectedValue(new Error("sending the email failed"));

            response = await request(app).post("/id-refused")
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
            // @ts-ignore
            mocked(buildEmailTransport).mockImplementation(() => {
                throw new Error("Failed to build email transporter");
            });

            response = await request(app).post("/id-refused")
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
