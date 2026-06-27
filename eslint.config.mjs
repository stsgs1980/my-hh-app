// eslint.config.mjs
// STD-DOC-002 Markdown Formatting v2.4 + STD-DOC-003 No-Unicode Policy v2.3
// AHG Rule 12 (Anti-monolith) + AHG Rule 15 (Extended Unicode Policy)
// Flat config (ESLint 9+)

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import markdown from "eslint-plugin-markdown";
import noUnicodePolicy from "./eslint-rules/no-unicode-policy.js";
import codeBlockLanguage from "./eslint-rules/code-block-language.js";
import maxFileLines from "./eslint-rules/max-file-lines.js";
import maxFileLinesHard from "./eslint-rules/max-file-lines-hard.js";
import ahgUnicodeGraphics from "./eslint-rules/ahg-unicode-graphics.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = [
  // --- Global ignores ---
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      "examples/**",
      "skills/**",
      "upload/**",
      "tool-results/**",
      "download/**",
      "mini-services/**",
    ],
  },

  // --- Next.js base config ---
  ...nextCoreWebVitals,
  ...nextTypescript,

  // --- Markdown files (.md) ---
  // eslint-plugin-markdown extracts code blocks from .md files
  // and presents them as virtual JS/TS files for linting.
  ...markdown.configs.recommended,

  // --- Code blocks inside .md files (virtual files) ---
  {
    files: ["**/*.md/**"],
    plugins: {
      "no-unicode-policy": noUnicodePolicy,
      "ahg": { rules: { "ahg-unicode-graphics": ahgUnicodeGraphics } },
      "code-block-language": { rules: { "code-block-language": codeBlockLanguage } },
    },
    rules: {
      // STD-DOC-002: Code blocks must specify a language
      "code-block-language/code-block-language": "warn",

      // STD-DOC-003: No emoji/Unicode graphics in code blocks inside .md
      "no-unicode-policy/no-emoji": "error",
      "no-unicode-policy/no-unicode-graphics": "error",

      // AHG Rule 15: Extended unicode graphics (em dash, guillemets, euro, etc.)
      "ahg/ahg-unicode-graphics": "error",

      // General quality rules for code inside .md blocks
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-console": "off",
    },
  },

  // --- .md files themselves (not code blocks) ---
  {
    files: ["**/*.md"],
    plugins: {
      "no-unicode-policy": noUnicodePolicy,
    },
    rules: {
      // STD-DOC-002 + STD-DOC-003 section 4: No emoji in Markdown documentation
      // Severity: error ([C] Critical) -- same rule, same severity as source code.
      "no-unicode-policy/no-emoji-in-md": "error",

      // STD-DOC-002 + STD-DOC-003 section 4: No Unicode icons in Markdown documentation
      // Severity: error ([C] Critical) -- same rule, same severity as source code.
      "no-unicode-policy/no-unicode-graphics-in-md": "error",
    },
  },

  // --- Source code files (.ts, .tsx, .js, .jsx, .mjs) ---
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    plugins: {
      "no-unicode-policy": noUnicodePolicy,
      "ahg": {
        rules: {
          "max-file-lines": maxFileLines,
          "max-file-lines-hard": maxFileLinesHard,
          "ahg-unicode-graphics": ahgUnicodeGraphics,
        },
      },
    },
    rules: {
      // STD-DOC-003 [C] Critical: No emoji in production code / UI strings
      "no-unicode-policy/no-emoji": "error",

      // STD-DOC-003 [C] Critical: No Unicode graphics in production code
      "no-unicode-policy/no-unicode-graphics": "error",

      // STD-DOC-002/003: No irregular whitespace (NBSP, ZWSP, etc.)
      "no-irregular-whitespace": "error",

      // AHG Rule 15: Extended unicode graphics (em dash, guillemets, euro, etc.)
      // Covers ranges not in STD-DOC-003: U+2013-U+2015, U+00AB/BB, U+20AC, U+2070-U+209F, U+2100-U+218F
      "ahg/ahg-unicode-graphics": "error",

      // AHG Rule 12 (WARN tier): Files 200+ lines get a warning
      "ahg/max-file-lines": "warn",

      // AHG Rule 12 (ERROR tier): Files 250+ lines block lint (400 hard cap)
      "ahg/max-file-lines-hard": "error",
    },
  },

  // --- shadcn/ui generated components: exempt from anti-monolith ---
  // Must come AFTER the general source code block (last match wins in flat config)
  {
    files: ["src/components/ui/**"],
    rules: {
      "ahg/max-file-lines": "off",
      "ahg/max-file-lines-hard": "off",
    },
  },

  // --- Custom ESLint rules: exempt from anti-monolith (rule files need length) ---
  {
    files: ["eslint-rules/**"],
    rules: {
      "ahg/max-file-lines": "off",
      "ahg/max-file-lines-hard": "off",
    },
  },

  // --- Relaxed rules for the project ---
  {
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/prefer-as-const": "off",
      "@typescript-eslint/no-unused-disable-directive": "off",

      // React rules
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/purity": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "react-compiler/react-compiler": "off",

      // Next.js rules
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",

      // General JavaScript rules
      "prefer-const": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "no-debugger": "off",
      "no-empty": "off",
      "no-case-declarations": "off",
      "no-fallthrough": "off",
      "no-mixed-spaces-and-tabs": "off",
      "no-redeclare": "off",
      "no-undef": "off",
      "no-unreachable": "off",
      "no-useless-escape": "off",
    },
  },
];

export default config;