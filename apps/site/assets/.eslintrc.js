const baseConfig = {
  extends: ["airbnb", "prettier", "prettier/react"],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  plugins: ["prettier", "react-hooks"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "error",
    "jsx-a11y/label-has-for": "off", // deprecated in newer versions
    "jsx-a11y/label-has-associated-control": [2, { "depth": 3 }],
    "react/jsx-curly-brace-presence": "warn",
    "react/require-default-props": "off",
    "prefer-object-spread": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unused-prop-types": "warn",
    // consider replacing camelcase rule with naming-convention specification (https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md)
    "camelcase": "off",
    "react/destructuring-assignment": "off"
  },
  env: {
    browser: true,
    jest: true,
    mocha: true
  },
  globals: {
    google: "readonly",
    $: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  }
};

module.exports = baseConfig;
