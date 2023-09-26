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

export const handleCategoriesGet: RequestHandler = async(_request, response) => {
    await new Promise(resolve => setTimeout(() => response.status(200).json(categoriesController()), 5000));
};