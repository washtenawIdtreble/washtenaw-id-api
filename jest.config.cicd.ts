import type { Config } from "@jest/types";

import mainConfig from "./jest.config";

const config: Config.InitialOptions = {
    ...mainConfig,
    testPathIgnorePatterns: [
        "./src/utilities/env.test.ts",
    ],
};
export default config;