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
    "jsx-a11y/label-has-for": [2, {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "jsx-a11y/label-has-associated-control": [2, {
      "assert": "either"
    }],
  },
  env: {
    browser: true,
    jest: true,
    mocha: true
  },
  globals: {
    google: "readonly",
    $: true
  }
};

module.exports = baseConfig;
