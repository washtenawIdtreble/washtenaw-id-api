import { RequestHandler } from "express";

export type Category = { displayName: string, name: string };

export const CATEGORIES: Record<string, Category> = {
    banks: { displayName: "Banks", name: "banks" },
    food: { displayName: "Food", name: "food" },
    jobs: { displayName: "Jobs", name: "jobs" },
    mentalHealth: { displayName: "Mental Health", name: "mental-health" },
    pharmacies: { displayName: "Pharmacies", name: "pharmacies" },
    transportation: { displayName: "Transportation", name: "transportation" },
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