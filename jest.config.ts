import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
};
export default config;