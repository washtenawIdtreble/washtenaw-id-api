import { RequestHandler } from "express";

export const handleAccessibilityFormSubmit: RequestHandler = (_request, response) => {
    response.status(200).end();
};