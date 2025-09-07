import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            // "no-console": "warn", // 콘솔 경고 추가
        },
        ignores: [
            "build/**",
            "dist/**",
            "node_modules/",
            "figma_20250805/",
            ".next/**"
        ],
    },
];

export default eslintConfig;
