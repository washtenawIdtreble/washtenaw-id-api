import request from "supertest";
import { app } from "../app";
import { stubBusiness, stubCategorizedBusinesses } from "../../test-helpers/test-factories";
import { faker } from "@faker-js/faker";
import { FAKER_BUSINESSES_SEED } from "./all-businesses";

describe("all businesses endpoint", () => {
    test("should return a list of categories and businesses", async () => {
        const response = await request(app).get("/businesses");
        setTimeout(() => {
            expect(response.statusCode).toEqual(200);
            faker.seed(FAKER_BUSINESSES_SEED);
            expect(response.body).toEqual([
                stubCategorizedBusinesses({
                    category: { displayName: "Banks", name: "banks" },
                    businesses: [
                        stubBusiness(),
                        stubBusiness(),
                        stubBusiness(),
                    ],
                }),
                stubCategorizedBusinesses({
                    category: { displayName: "Food", name: "food" },
                    businesses: [
                        stubBusiness(),
                        stubBusiness(),
                        stubBusiness(),
                    ],
                }),
                stubCategorizedBusinesses({
                    category: { displayName: "Jobs", name: "jobs" },
                    businesses: [
                        stubBusiness(),
                        stubBusiness(),
                        stubBusiness(),
                    ],
                }),
                stubCategorizedBusinesses({
                    category: { displayName: "Mental Health", name: "mental-health" },
                    businesses: [
                        stubBusiness(),
                        stubBusiness(),
                        stubBusiness(),
                    ],
                }),
                stubCategorizedBusinesses({
                    category: { displayName: "Pharmacies", name: "pharmacies" },
                    businesses: [
                        stubBusiness(),
                        stubBusiness(),
                        stubBusiness(),
                    ],
                }),
                stubCategorizedBusinesses({
                    category: { displayName: "Transportation", name: "transportation" },
                    businesses: [
                        stubBusiness(),
                        stubBusiness(),
                        stubBusiness(),
                    ],
                }),
            ]);
        }, 5000);
    }, 6000);
});