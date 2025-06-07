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
    "!**/search.ts", // for now,
    "!./app/global-navigation.ts", // tested with Cypress
    "!./helpers/socketTestHelpers.ts", // more test utilities
    "!./components/ErrorPage.tsx",
    "!./sentry.ts",
    "!**/*.d.ts",
    "!./phoenix-hooks/**"
  ],
  coverageReporters: ["html"],
  coverageThreshold: {
    global: {
      branches: 88,
      functions: 90,
      lines: 90,
      statements: 90
    },
    // The Leaflet API is difficult to test, so we consider a lower
    // threshold acceptable for these modules. However, callbacks in
    // these modules should always use named functions, and have unit tests.
    "./ts/leaflet/components/": {
      branches: 75,
      functions: 85,
      lines: 94,
      statements: -25
    }
  },
  testURL: "https://dev.mbtace.com",
  transform: {
    "^.+\\.js?$": "babel-jest",
    "^.+\\.ts?$": "ts-jest"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "./tnm/__tests__/setupTests.ts",
    "<rootDir>/jest-setup.ts"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "./ts-build",
    "./tnm/__tests__/setupTests.ts",
    "./tnm/__tests__/helpers",
    "./ts/__tests__/test-render-helper.tsx",
    "./stop/__tests__/helpers.ts"
  ],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/tnm/__tests__/helpers/svgStubber.js"
  }
};
