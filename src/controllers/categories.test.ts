import request from "supertest";
import { app } from "../app";
import { stubCategory } from "../../test-helpers/test-factories";

describe("categories endpoint", () => {
    test("should return a list of categories", async () => {
        const response = await request(app).get("/categories");
        setTimeout(() => {
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual([
                stubCategory({ displayName: "Banks", name: "banks" }),
                stubCategory({ displayName: "Food", name: "food" }),
                stubCategory({ displayName: "Jobs", name: "jobs" }),
                stubCategory({ displayName: "Mental Health", name: "mental-health" }),
                stubCategory({ displayName: "Pharmacies", name: "pharmacies" }),
                stubCategory({ displayName: "Transportation", name: "transportation" }),
            ]);
        }, 5000);
    }, 6000);
});