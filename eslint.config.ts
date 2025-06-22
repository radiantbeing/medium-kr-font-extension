import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
    {
        ignores: ["**/dist/**"]
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            globals: {...globals.browser, ...globals.node}
        }
    },
    eslintConfigPrettier
);
