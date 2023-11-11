import { Category } from "../src/controllers/categories";
import { buildRandomBusiness, Business, CategorizedBusinesses } from "../src/controllers/all-businesses";
import { AccessibilityFormData } from "../src/controllers/accessibility-form-submit";
import { ContactFormData } from "../src/controllers/contact-form-submit";
import { IdRefusedFormData } from "../src/controllers/id-refused-form-submit";
import { faker } from "@faker-js/faker";

export const stubCategory = (attributes: Partial<Category> = {}): Category => {
    return {
        displayName: attributes.displayName === undefined ? "Stub DisplayName" : attributes.displayName,
        name: attributes.name === undefined ? "stub-name" : attributes.name,
    };
};

export const stubBusiness = (attributes: Partial<Business> = {}): Business => {
    const randomBusiness = buildRandomBusiness();

    return {
        name: attributes.name === undefined ? randomBusiness.name : attributes.name,
        address: attributes.address === undefined ? randomBusiness.address : attributes.address,
        city: attributes.city === undefined ? randomBusiness.city : attributes.city,
        state: attributes.state === undefined ? randomBusiness.state : attributes.state,
        zip: attributes.zip === undefined ? randomBusiness.zip : attributes.zip,
        website: attributes.website === undefined ? randomBusiness.website : attributes.website,
        phone: attributes.phone === undefined ? randomBusiness.phone : attributes.phone,
        description: attributes.description === undefined ? randomBusiness.description : attributes.description,
    };
};

export const stubCategorizedBusinesses = (attributes: Partial<CategorizedBusinesses> = {}): CategorizedBusinesses => {
    return {
        category: attributes.category === undefined ? stubCategory() : attributes.category,
        businesses: attributes.businesses === undefined ? [stubBusiness({ name: "Stub Business" })] : attributes.businesses,
    };
};

export const stubIdRefusedFormData = (attributes: Partial<IdRefusedFormData> = {}): IdRefusedFormData => {
    return {
        name: attributes.name === undefined ? faker.name.fullName() : attributes.name,
        email: attributes.email === undefined ? faker.internet.email() : attributes.email,
        phone: attributes.phone === undefined ? faker.phone.number("##########") : attributes.phone,

        businessName: attributes.businessName === undefined ? generateBusinessName() : attributes.businessName,
        businessStreet: attributes.businessStreet === undefined ? faker.address.street() : attributes.businessStreet,
        businessCity: attributes.businessCity === undefined ? faker.address.city() : attributes.businessCity,
        whenRefused: attributes.whenRefused === undefined ? faker.lorem.word() : attributes.whenRefused,
        ageRange: attributes.ageRange === undefined ? faker.helpers.arrayElement(["under 18", "over 55"]) : attributes.ageRange,

        description: attributes.description === undefined ? faker.lorem.paragraph(3) : attributes.description,
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

export const stubContactFormData = (attributes: Partial<ContactFormData> = {}): ContactFormData => {
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

const generateBusinessName = () => {
    return toTitleCase(`${faker.word.adjective()} ${faker.word.noun()} ${faker.company.companySuffix()}`);
};
