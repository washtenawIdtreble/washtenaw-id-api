import { RequestHandler } from "express";

export type Category = { displayName: string, category: string };

export const CATEGORIES = {
    banks: { displayName: "Banks", category: "banks" },
    food: { displayName: "Food", category: "food" },
    jobs: { displayName: "Jobs", category: "jobs" },
    mentalHealth: { displayName: "Mental Health", category: "mental-health" },
    pharmacies: { displayName: "Pharmacies", category: "pharmacies" }, 
    transportation: { displayName: "Transportation", category: "transportation" },
}; 

const categoriesController = (): Category[] => {
    return [
        CATEGORIES.banks,
        CATEGORIES.food,
        CATEGORIES.jobs,
        CATEGORIES.mentalHealth,
        CATEGORIES.pharmacies,
        CATEGORIES.transportation,
    ];
};

export const handleCategoriesGet: RequestHandler = (_request, response) => {
    response.status(200).json(categoriesController());
};