import request from "supertest";
import { app } from "../app";

describe("categories endpoint", () => {
    test("should return a list of categories", async () => {
        const response = await request(app).get("/categories");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            "banks",
            "food",
            "jobs",
            "mental health",
            "pharmacies",
            "transportation",
        ]);
    });
});