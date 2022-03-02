import request from "supertest";
import { app } from "./app";

describe("Endpoints", () => {
    test("should have a ping endpoint to check for health", async () => {
        const response = await request(app).get("/ping");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: "pong" });
    });
});
