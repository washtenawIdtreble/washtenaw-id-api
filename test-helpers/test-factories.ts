import { Category } from "../src/controllers/categories";
import { Business, CategorizedBusinesses } from "../src/controllers/all-businesses";
import { AccessibilityFormData } from "../src/controllers/accessibility-form-submit";
import { faker } from "@faker-js/faker";

export const stubCategory = (attributes: Partial<Category> = {}): Category => {
    return {
        displayName: attributes.displayName === undefined ? "Stub DisplayName" : attributes.displayName,
        name: attributes.name === undefined ? "stub-name" : attributes.name,
    };
};

export const stubBusiness = (attributes: Partial<Business> = {}): Business => {
    const name = toTitleCase(`${faker.word.adjective()} ${faker.word.noun()}`);
    return {
        name: attributes.name === undefined ? `${name} ${faker.company.companySuffix()}` : attributes.name,
        address: attributes.address === undefined ? faker.address.streetAddress() : attributes.address,
        city: attributes.city === undefined ? faker.address.city() : attributes.city,
        state: attributes.state === undefined ? faker.address.stateAbbr() : attributes.state,
        zip: attributes.zip === undefined ? faker.address.zipCode() : attributes.zip,
        website: attributes.website === undefined ? faker.internet.url() : attributes.website,
        phone: attributes.phone === undefined ? faker.phone.number() : attributes.phone,
        description: attributes.description === undefined ? faker.lorem.paragraph(4) : attributes.description,
    };
};

export const stubCategorizedBusinesses = (attributes: Partial<CategorizedBusinesses> = {}): CategorizedBusinesses => {
    return {
        category: attributes.category === undefined ? stubCategory() : attributes.category,
        businesses: attributes.businesses === undefined ? [stubBusiness({ name: "Stub Business" })] : attributes.businesses,
    };
};

export const stubAccessibilityFormData = (attributes: Partial<AccessibilityFormData> = {}): AccessibilityFormData => {
    return {
        name: attributes.name === undefined ? "Stub Name" : attributes.name,
        email: attributes.email === undefined ? "stub_email@example.com" : attributes.email,
        phone: attributes.phone === undefined ? "9999999999" : attributes.phone,
        description: attributes.description === undefined ? "Stub Description" : attributes.description,
    };
};

const toTitleCase = (input: string) => {
    const words = input.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
};