import { RequestHandler } from "express";

export type Categories = { displayName: string, category: string };

const categoriesController = (): Categories[] => {
    return [
        { displayName: "Banks", category: "banks" },
        { displayName: "Food", category: "food" },
        { displayName: "Jobs", category: "jobs" },
        { displayName: "Mental Health", category: "mental-health" },
        { displayName: "Pharmacies", category: "pharmacies" }, 
        { displayName: "Transportation", category: "transportation" },
    ];
};

export const handleCategoriesGet: RequestHandler = (_request, response) => {
    response.status(200).json(categoriesController());
};