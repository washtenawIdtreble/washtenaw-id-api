import { RequestHandler } from "express";

export type CategorizedBusinesses = {
    category: string;
    businesses: string[];
}

const businessesController = (): CategorizedBusinesses[] => {
    return [
        {
            category: "banks", businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: "food", businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: "jobs", businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: "mental health", businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: "pharmacies", businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: "transportation", businesses: [
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