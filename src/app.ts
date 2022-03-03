import express, { Application } from "express";
import { router } from "./routes";
import cors from "cors";

export const app: Application = express();

app.use(cors());
app.use(router);