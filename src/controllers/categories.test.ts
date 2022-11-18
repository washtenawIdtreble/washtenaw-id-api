import request from "supertest";
import { app } from "../app";
import { stubCategory } from "../../test-helpers/test-factories";

describe("categories endpoint", () => {
    test("should return a list of categories", async () => {
        const response = await request(app).get("/categories");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            stubCategory({ displayName: "Banks", category: "banks" }),
            stubCategory({ displayName: "Food", category: "food" }),
            stubCategory({ displayName: "Jobs", category: "jobs" }),
            stubCategory({ displayName: "Mental Health", category: "mental-health" }),
            stubCategory({ displayName: "Pharmacies", category: "pharmacies" }), 
            stubCategory({ displayName: "Transportation", category: "transportation" }),
        ]);
    });
});