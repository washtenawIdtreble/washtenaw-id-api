import request from "supertest";
import { app } from "../app";
import { stubCategorizedBusinesses } from "../../test-helpers/test-factories";

describe("all businesses endpoint", () => {
    test("should return a list of categories and businesses", async () => {
        const response = await request(app).get("/businesses");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            stubCategorizedBusinesses({
                category: { displayName: "Banks", name: "banks" },
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Food", name: "food" },
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Jobs", name: "jobs" },
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Mental Health", name: "mental-health" },
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Pharmacies", name: "pharmacies" },
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
            stubCategorizedBusinesses({
                category: { displayName: "Transportation", name: "transportation" },
                businesses: [
                    "business 1",
                    "business 2",
                    "business 3",
                ],
            }),
        ]);
    });
});