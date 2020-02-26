module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!./app/helpers/testUtils.ts", // test utilities
    "!**/*-entry.ts", // not necessary to test entry files
    "!**/*-loader.tsx", // not necessary to test loader files
    "!**/search.ts" // for now
  ],
  coverageReporters: ["html"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    },
    // The Leaflet API is difficult to test, so we consider a lower
    // threshold acceptable for these modules. However, callbacks in
    // these modules should always use named functions, and have unit tests.
    "./ts/leaflet/components/": {
      branches: 75,
      functions: 85,
      lines: 94,
      statements: -25
    },
    "./ts/tnm/components/leaflet": {
      branches: 50,
      functions: 60,
      lines: 60,
      statements: -25
    }
  },
  testURL: "https://mbta.com",
  transform: {
    "^.+\\.js?$": "babel-jest",
    "^.+\\.ts?$": "ts-jest"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./tnm/__tests__/setupTests.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "./ts-build",
    "./tnm/__tests__/setupTests.ts",
    "./tnm/__tests__/helpers"
  ],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/tnm/__tests__/helpers/svgStubber.js"
  }
};
