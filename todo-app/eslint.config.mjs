import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals["jest/globals"],
      },
    },
  },
  pluginJs.configs.recommended,
];
