import express, { Application } from "express";

export const app: Application = express();

app.get("/ping", async (_request, response) => {
    response
        .status(200)
        .json({ message: "pong" });
});