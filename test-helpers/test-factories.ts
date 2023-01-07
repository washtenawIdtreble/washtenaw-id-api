import { Category } from "../src/controllers/categories";
import { buildRandomBusiness, Business, CategorizedBusinesses } from "../src/controllers/all-businesses";
import { AccessibilityFormData } from "../src/controllers/accessibility-form-submit";

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

export const stubAccessibilityFormData = (attributes: Partial<AccessibilityFormData> = {}): AccessibilityFormData => {
    return {
        name: attributes.name === undefined ? "Stub Name" : attributes.name,
        email: attributes.email === undefined ? "stub_email@example.com" : attributes.email,
        phone: attributes.phone === undefined ? "9999999999" : attributes.phone,
        description: attributes.description === undefined ? "Stub Description" : attributes.description,
    };
};