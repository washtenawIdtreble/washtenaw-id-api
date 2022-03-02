import { RequestHandler } from "express";

type CategoriesResponse = string[];

const categoriesController = (): CategoriesResponse => {
    return [
        "banks",
        "food",
        "jobs",
        "mental health",
        "pharmacies",
        "transportation",
    ];
};

export const handleCategoriesGet: RequestHandler = (_request, response) => {
    response.status(200).json(categoriesController());
};