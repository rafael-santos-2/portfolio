import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Allow destructuring properties out of an object purely to strip them
  // from a `...rest` that gets spread elsewhere (e.g. action button props).
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true, args: "after-used", argsIgnorePattern: "^_" },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "types/validator.ts",
    "routes.d.ts",
    "public/**",
    "functions/lib/**",
    "utils/validator.ts",
  ]),
]);

export default eslintConfig;
