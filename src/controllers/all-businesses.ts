import { RequestHandler } from "express";
import { CATEGORIES, Category } from "./categories";
import { faker } from "@faker-js/faker";

export type Business = {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    website: string;
    phone: string;
    description: string;
}

export type CategorizedBusinesses = {
    category: Category;
    businesses: Business[];
}

export const FAKER_BUSINESSES_SEED = Math.floor(Math.random() * 1000);

const businessesController = (): CategorizedBusinesses[] => {
    faker.seed(FAKER_BUSINESSES_SEED);
    return [
        {
            category: CATEGORIES.banks,
            businesses: [
                buildRandomBusiness(),
                buildRandomBusiness(),
                buildRandomBusiness(),
            ],
        },
        {
            category: CATEGORIES.food,
            businesses: [
                buildRandomBusiness(),
                buildRandomBusiness(),
                buildRandomBusiness(),
            ],
        },
        {
            category: CATEGORIES.jobs,
            businesses: [
                buildRandomBusiness(),
                buildRandomBusiness(),
                buildRandomBusiness(),
            ],
        },
        {
            category: CATEGORIES.mentalHealth,
            businesses: [
                buildRandomBusiness(),
                buildRandomBusiness(),
                buildRandomBusiness(),
            ],
        },
        {
            category: CATEGORIES.pharmacies,
            businesses: [
                buildRandomBusiness(),
                buildRandomBusiness(),
                buildRandomBusiness(),
            ],
        },
        {
            category: CATEGORIES.transportation,
            businesses: [
                buildRandomBusiness(),
                buildRandomBusiness(),
                buildRandomBusiness(),
            ],
        },
    ];
};

export const handleBusinessesGet: RequestHandler = async (_request, response) => {
    
    await new Promise(resolve => setTimeout(() => response.status(200).json(businessesController(), ), 5000));
};

export const buildRandomBusiness = () => {
    const name = toTitleCase(`${faker.word.adjective()} ${faker.word.noun()}`);
    return {
        name: `${name} ${faker.company.companySuffix()}`,
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode(),
        website: faker.internet.url(),
        phone: faker.phone.number(),
        description: faker.lorem.paragraph(4),
    };
};

const toTitleCase = (input: string) => {
    const words = input.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
};
