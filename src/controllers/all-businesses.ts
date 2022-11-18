import { RequestHandler } from "express";
import { Category, CATEGORIES } from "./categories";

export type CategorizedBusinesses = {
    category: Category;
    businesses: string[];
}

const businessesController = (): CategorizedBusinesses[] => {
    return [
        {
            category: CATEGORIES.banks, 
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: CATEGORIES.food, 
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: CATEGORIES.jobs, 
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: CATEGORIES.mentalHealth, 
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: CATEGORIES.pharmacies, 
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: CATEGORIES.transportation, 
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
    ];
};

export const handleBusinessesGet: RequestHandler = (_request, response) => {
    response.status(200).json(businessesController());
};