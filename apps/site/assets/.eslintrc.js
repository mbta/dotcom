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
    "no-console": "error"
  },
  env: {
    browser: true,
    jest: true
  },
  globals: {
    google: "readonly"
  }
};

module.exports = baseConfig;
