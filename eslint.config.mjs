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
        ignores: [
            "build/**",       // 예: build 폴더 내 모든 파일 무시
            "dist/**",        // dist 폴더 무시
            "node_modules/",  // node_modules 기본 제외 대상
            "figma_20250805/"
        ],
    },
];

export default eslintConfig;
