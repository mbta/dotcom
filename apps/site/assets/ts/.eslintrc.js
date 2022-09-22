const baseConfig = require("../.eslintrc");

// Eslint config for Typescript files (merges with above)
const config = {
  ...baseConfig,
  parser: "@typescript-eslint/parser",
  plugins: [...baseConfig.plugins, "@typescript-eslint", "testing-library"],
  parserOptions: {
    ...baseConfig.parserOptions,
    project: "../tsconfig.json"
  },
  rules: {
    ...baseConfig.rules,
    // Turn this rule off since it errors falsely with Typescript imports, it'd be caught by the build anyway
    "import/no-unresolved": "off",
    // Modified. Prettier rules indent
    "@typescript-eslint/indent": "off",
    // Don't require return types on function expressions
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true }
    ],
    // Modified. This would disallow the ! postfix operator (non-null-assertion operator), seems like overkill - MH
    "@typescript-eslint/no-non-null-assertion": "off",
    // newly updated rule
    "import/extensions": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["warn"],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    // note you must disable the base rule as it can report incorrect errors
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"]
  },
  extends: ["plugin:@typescript-eslint/recommended"]
};

module.exports = config;
