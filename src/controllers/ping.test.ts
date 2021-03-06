import request from "supertest";
import { app } from "../app";

describe("ping endpoint", () => {
    test("should return pong", async () => {
        const response = await request(app).get("/ping");
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: "pong" });
    });
});