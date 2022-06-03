import * as dotenv from "dotenv";

describe("Environment Variables", () => {
    test("file exists locally", async () => {
        const result = dotenv.config();

        const error = result.error;

        if (error && error.message.includes("ENOENT")) {
            throw new Error("You are missing your .env file - see README.md");
        }

        expect(result.error).toBeUndefined();
    });
});