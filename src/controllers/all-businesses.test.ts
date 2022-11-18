import request from "supertest";
import { app } from "../app";
import { stubCategorizedBusinesses } from "../../test-helpers/test-factories";

describe("all businesses endpoint", () => {
    test("should return a list of categories and businesses", async () => {
        const response = await request(app).get("/businesses");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            stubCategorizedBusinesses({
                category:{ displayName: "Banks", category: "banks" }, 
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Food", category: "food" }, 
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Jobs", category: "jobs" }, 
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Mental Health", category: "mental-health" }, 
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Pharmacies", category: "pharmacies" }, 
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Transportation", category: "transportation" }, 
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
        ]);
    });
});