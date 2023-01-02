import { RequestHandler } from "express";
import { CATEGORIES, Category } from "./categories";
import { stubBusiness } from "../../test-helpers/test-factories";
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
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: CATEGORIES.food,
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: CATEGORIES.jobs,
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: CATEGORIES.mentalHealth,
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: CATEGORIES.pharmacies,
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: CATEGORIES.transportation,
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
    ];
};

export const handleBusinessesGet: RequestHandler = (_request, response) => {
    response.status(200).json(businessesController());
};