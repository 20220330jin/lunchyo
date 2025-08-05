# WebStorm + Yarn Berry (PnP) 환경 설정 가이드

---

## 문제 상황

`create-next-app`으로 생성한 최신 Next.js 프로젝트(React 19, TypeScript 5)를 Yarn Berry의 PnP(Plug'n'Play) 모드로 전환했을 때, WebStorm IDE에서 다음과 같은 문제들이 발생함:

1.  **TS7026 에러**: `JSX element implicitly has type any...` 에러가 발생하며, JSX 문법을 인식하지 못함.
2.  **의존성 인식 실패**: IDE가 `package.json`의 의존성을 인식하지 못하고 "package is not installed" 경고를 표시함.

## 원인

WebStorm IDE가 Yarn PnP의 의존성 관리 방식(no `node_modules`)을 자동으로 인식하지 못하여, TypeScript 서버가 타입 정의 파일(`@types/react` 등)의 위치를 찾지 못하기 때문.

특히, `@yarnpkg/sdks` 도구가 `webstorm`을 공식적으로 지원하지 않아 수동 설정이 필요함.

## 최종 해결 과정 (Step-by-Step)

1.  **Yarn Berry 설정 확인**
    - 프로젝트 루트에 `.yarnrc.yml` 파일이 있는지 확인하고, 아래 내용이 포함되어 있는지 확인한다.
      ```yaml
      nodeLinker: pnp
      ```

2.  **Yarn Editor SDK 설치 (핵심)**
    - 터미널에서 `vscode`용 SDK를 설치하여, PnP 환경을 이해하는 TypeScript Wrapper를 생성한다.
      ```bash
      yarn dlx @yarnpkg/sdks vscode
      ```

3.  **WebStorm TypeScript 경로 수동 지정**
    - `Settings/Preferences` > `Languages & Frameworks` > `TypeScript` 로 이동한다.
    - `TypeScript:` 드롭다운 옆의 `...` 버튼을 클릭한다.
    - **숨김 파일 보기 단축키 (`Command` + `Shift` + `.`)**를 사용하여, 아래 경로의 `tsserver.js` 파일을 직접 선택한다.
      - **경로:** `[프로젝트 폴더]/.yarn/sdks/typescript/lib/tsserver.js`

4.  **`tsconfig.json`에 `jsxImportSource` 추가**
    - TypeScript에게 JSX 처리 방식을 명확히 알려주기 위해 아래 옵션을 추가한다.
      ```json
      {
        "compilerOptions": {
          // ...
          "jsx": "preserve",
          "jsxImportSource": "react"
        }
      }
      ```

5.  **WebStorm 캐시 무효화 및 재시작**
    - `File` > `Invalidate Caches...` > `Invalidate and Restart` 를 실행하여 IDE 설정을 완전히 초기화하고 재시작한다.

---

*이 과정을 통해 WebStorm은 Yarn PnP 환경을 올바르게 인식하고, 모든 타입 에러와 의존성 경고가 해결된다.*
