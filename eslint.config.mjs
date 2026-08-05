import { defineConfig } from "eslint/config";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...coreWebVitals,
  ...typescript,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "_archive/**", "scripts/**"],
  },
]);

export default eslintConfig;
