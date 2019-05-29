module.exports = {
  preset: "ts-jest",
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
      branches: 94,
      functions: 95,
      lines: 95,
      statements: -25 // No idea what good default is for this, this means "up to 25 uncovered statements allowed"
    },
    "./ts/tnm/components/leaflet": {
      // The Leaflet API is difficult to test, so we consider a lower
      // threshold acceptable for these modules. However, callbacks in
      // these modules should always use named functions, and have unit tests.
      branches: 55,
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
