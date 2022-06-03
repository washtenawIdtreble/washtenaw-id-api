import express, { Application } from "express";
import { router } from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

export const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);