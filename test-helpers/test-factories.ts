import { CategorizedBusinesses } from "../src/controllers/all-businesses";
import { AccessibilityFormData } from "../src/controllers/accessibility-form-submit";

export const stubCategorizedBusinesses = (attributes?: Partial<CategorizedBusinesses>): CategorizedBusinesses => {
    attributes = attributes || {};
    return {
        category: attributes.category === undefined ? "Stub Category" : attributes.category,
        businesses: attributes.businesses === undefined ? ["Stub Business"] : attributes.businesses,
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