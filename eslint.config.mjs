import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      "coverage/**",
      ".lintstagedrc.js",
      "commitlint.config.cjs",
      "eslint.config.mjs",
      "*.config.{js,cjs,mjs,ts}",
    ],
  },
];

export default eslintConfig;
