const baseConfig = require("../.eslintrc");

// Eslint config for Typescript files (merges with above)
const config = {
  ...baseConfig,
  parser: "@typescript-eslint/parser",
  plugins: [...baseConfig.plugins, "@typescript-eslint"],
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
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  extends: ["plugin:@typescript-eslint/recommended"]
};

module.exports = config;
