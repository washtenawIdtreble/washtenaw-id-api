import { AccessibilityFormData } from "../src/controllers/accessibility-form-submit";
import { ContactFormData } from "../src/controllers/contact-form-submit";
import { IdRefusedFormData } from "../src/controllers/id-refused-form-submit";
import { faker } from "@faker-js/faker";

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

        honeypotValue: attributes.honeypotValue === undefined ? "Stub Honeypot Value" : attributes.honeypotValue,
        timeToFillForm: attributes.timeToFillForm === undefined ? "Stub time to fill form" : attributes.timeToFillForm
    };
};

export const stubAccessibilityFormData = (attributes: Partial<AccessibilityFormData> = {}): AccessibilityFormData => {
    return {
        name: attributes.name === undefined ? "Stub Name" : attributes.name,
        email: attributes.email === undefined ? "stub_email@example.com" : attributes.email,
        phone: attributes.phone === undefined ? "9999999999" : attributes.phone,
        comments: attributes.comments === undefined ? "Stub Description" : attributes.comments,

        honeypotValue: attributes.honeypotValue === undefined ? "Stub Honeypot Value" : attributes.honeypotValue,
        timeToFillForm: attributes.timeToFillForm === undefined ? "Stub time to fill form" : attributes.timeToFillForm
    };
};

export const stubContactFormData = (attributes: Partial<ContactFormData> = {}): ContactFormData => {
    return {
        name: attributes.name === undefined ? "Stub Name" : attributes.name,
        email: attributes.email === undefined ? "stub_email@example.com" : attributes.email,
        phone: attributes.phone === undefined ? "9999999999" : attributes.phone,
        comments: attributes.comments === undefined ? "Stub Description" : attributes.comments,

        honeypotValue: attributes.honeypotValue === undefined ? "Stub Honeypot Value" : attributes.honeypotValue,
        timeToFillForm: attributes.timeToFillForm === undefined ? "Stub time to fill form" : attributes.timeToFillForm
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
