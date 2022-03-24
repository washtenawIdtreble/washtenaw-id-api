import { CategorizedBusinesses } from "../src/controllers/all-businesses";

export const stubCategorizedBusinesses = (attributes?: Partial<CategorizedBusinesses>): CategorizedBusinesses => {
    attributes = attributes || {};
    return {
        category: attributes.category === undefined ? "Stub Category" : attributes.category,
        businesses: attributes.businesses === undefined ? ["Stub Business"] : attributes.businesses,
    };
};