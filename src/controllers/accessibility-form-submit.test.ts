import { handleAccessibilityFormSubmit } from "./accessibility-form-submit";
import request from "supertest";
import { app } from "../app";

describe(handleAccessibilityFormSubmit.name, () => {
    test("", async () => {
        const body = {};

        const response = await request(app)
            .post("/accessibility-issues")
            .send(body);

        expect(response.statusCode).toEqual(200);
    });
});