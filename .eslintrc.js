module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    //   "eslint:recommended", "plugin:@typescript-eslint/recommended"
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "no-console": "warn",
  },
};
