import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    maxConcurrency: 10,
    extensionsToTreatAsEsm: [".ts"],
    coveragePathIgnorePatterns: ["./dist/*"],
    verbose: true,
    testTimeout: 500000,
};

export default config;
