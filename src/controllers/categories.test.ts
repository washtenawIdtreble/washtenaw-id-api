import request from "supertest";
import { app } from "../app";
import { stubCategories } from "../../test-helpers/test-factories";

describe("categories endpoint", () => {
    test("should return a list of categories", async () => {
        const response = await request(app).get("/categories");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            stubCategories({ displayName: "Banks", category: "banks" }),
            stubCategories({ displayName: "Food", category: "food" }),
            stubCategories({ displayName: "Jobs", category: "jobs" }),
            stubCategories({ displayName: "Mental Health", category: "mental-health" }),
            stubCategories({ displayName: "Pharmacies", category: "pharmacies" }), 
            stubCategories({ displayName: "Transportation", category: "transportation" }),
        ]);
    });
});