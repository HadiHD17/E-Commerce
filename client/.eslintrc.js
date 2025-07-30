module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["react-app", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // optional: custom rules
    "no-unused-vars": "warn",
    semi: ["error", "always"],
    quotes: ["error", "single"],
  },
};
