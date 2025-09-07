# ESLint 및 Prettier 종합 환경 설정 계획

이 문서는 `lunchyo` 프로젝트에 일관된 코드 스타일과 높은 코드 품질, 웹 접근성을 적용하기 위한 ESLint 및 Prettier 설정 과정을 안내합니다.

## 목표

- **코드 스타일 통일:** Prettier를 사용해 모든 코드의 포맷을 자동으로 일치시킵니다.
- **코드 품질 향상:** ESLint의 추천 규칙과 React/Next.js أفضل الممارسات(best practice)를 적용합니다.
- **웹 접근성 준수:** 토스에서 만든 접근성 린트 플러그인을 도입하여 기본적인 웹 접근성 규칙을 검사합니다.

---

## 1단계: 필요한 패키지 설치

아래 명령어를 터미널에 입력하여 개발 의존성 패키지들을 설치합니다.

```bash
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier @tossteam/eslint-plugin-a11y-fundamental eslint-plugin-react-hooks
```

- `prettier`: 코드 포맷터.
- `eslint-plugin-prettier`, `eslint-config-prettier`: ESLint와 Prettier의 충돌을 막고 통합 실행을 위함.
- `@tossteam/eslint-plugin-a11y-fundamental`: 토스 웹 접근성 린트 규칙.
- `eslint-plugin-react-hooks`: React Hooks 사용 규칙을 강제.

---

## 2단계: Prettier 설정 파일 생성

프로젝트 최상단에 `.prettierrc.json` 파일을 만들고 아래 내용을 추가합니다. 팀의 스타일에 맞게 수정할 수 있습니다.

**파일명:** `.prettierrc.json`

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "always"
}
```

---

## 3단계: ESLint 설정 파일 업데이트

기존의 `eslint.config.mjs` 파일을 아래 내용으로 덮어씁니다. Next.js 기본 규칙에 더해, 설치한 플러그인들의 추천 규칙과 Prettier와의 통합 설정을 추가했습니다.

**파일명:** `eslint.config.mjs`

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-config-prettier";
import hooksPlugin from "eslint-plugin-react-hooks";
import a11yPlugin from "@tossteam/eslint-plugin-a11y-fundamental";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
    ...compat.extends("next/core-web-vitals"),
    {
        plugins: {
            "react-hooks": hooksPlugin,
            "a11y-fundamental": a11yPlugin,
        },
        rules: {
            ...hooksPlugin.configs.recommended.rules,
            ...a11yPlugin.configs.recommended.rules,
        },
    },
    {
        ignores: [
            "build/**",
            "dist/**",
            "node_modules/",
            "figma_20250805/",
            ".next/**",
            "drizzle/**"
        ],
    },
    // Prettier 충돌 방지 설정. 반드시 배열의 마지막에 위치해야 합니다.
    eslintPluginPrettier,
];

export default eslintConfig;
```

---

## 4단계: VSCode 설정 (선택 사항)

코드 저장 시 자동으로 포맷팅 및 린트 수정이 적용되도록 프로젝트에 VSCode 설정 파일을 추가합니다.

1.  프로젝트 최상단에 `.vscode` 폴더를 생성합니다.
2.  해당 폴더 내에 `settings.json` 파일을 만들고 아래 내용을 추가합니다.

**파일명:** `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```
*위 설정을 적용하려면 VSCode에 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)와 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 확장 프로그램이 설치되어 있어야 합니다.*

---

## 5단계: 동작 확인

모든 설정이 완료된 후, 아래 명령어를 실행하여 프로젝트 전체의 코드 스타일을 정리하고 린트 규칙을 확인합니다.

```bash
# 1. Prettier로 프로젝트 전체 파일 포맷팅
npx prettier --write .

# 2. ESLint로 수정 가능한 문제들 자동 수정
npm run lint -- --fix
```

이제 파일을 수정하고 저장할 때마다 스타일이 자동으로 정리되고, 린트 규칙에 어긋나는 부분이 있다면 에디터에 표시될 것입니다.
