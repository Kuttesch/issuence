export default [
    {
      files: ["**/*.ts", "**/*.tsx"],
      languageOptions: {
        parser: "@typescript-eslint/parser"
      },
      rules: {
        "no-unused-vars": "warn"
      }
    }
  ];
  