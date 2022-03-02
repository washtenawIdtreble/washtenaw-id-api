import express, { Application } from "express";
import { router } from "./routes";

export const app: Application = express();

app.use(router);