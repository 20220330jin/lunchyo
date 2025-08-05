# 오늘 뭐 먹지? (lunchyo) 프로젝트 개발 계획

---

## 1. 프로젝트 원칙

본 프로젝트는 다음 7가지 원칙을 최우선으로 따릅니다. 이 문서는 Gemini와 개발자 모두가 참고하는 가이드라인입니다.

1.  **2인 협업을 통한 구현**: 모든 코드는 2명의 개발자가 함께 논의하고 리뷰하며 진행합니다.
2.  **설명할 수 없는 코드 지양**: 자신이 작성한 코드는 왜 그렇게 작성했는지 명확히 설명할 수 있어야 합니다.
3.  **단순한 코드 우선**: 복잡하고 화려한 기술보다 단순하고 명확한 코드를 우선적으로 지향합니다.
4.  **Toss 라이브러리 적극 사용**: 데이터 페칭, 상태 관리 등에서 `@tanstack/react-query` 와 같이 토스에서 사용하거나 권장하는 검증된 라이브러리를 적극적으로 활용합니다.
5.  **Pull Request 기반 협업**: 모든 코드 변경사항은 Git 브랜치를 생성하고 Pull Request(PR)를 통해 병합합니다.
6.  **표준 아키텍처 사용**: 업계에서 널리 쓰이고 검증된 표준 아키텍처를 채택하여 일관성을 유지합니다.
7.  **`ui` 폴더는 참고용**: `ui` 폴더의 내용은 최종 결과물의 청사진일 뿐, 코드 구현 시 반드시 따를 필요는 없습니다.

---

## 2. 아키텍처

**Feature-Sliced Design (FSD)** 를 표준 아키텍처로 채택합니다. 이를 통해 코드의 응집도를 높이고 결합도를 낮춰 유지보수와 확장이 용이한 구조를 만듭니다.

-   **`app`**: 전역 설정, 스타일, 레이아웃, Provider 등 애플리케이션의 진입점.
-   **`pages`**: 각 페이지를 구성하는 최상위 컴포넌트. (Next.js의 `app` 라우터 폴더)
-   **`widgets`**: 여러 `features`와 `entities`를 조합한 독립적인 UI 블록. (예: 헤더, 맛집 리스트)
-   **`features`**: 비즈니스 로직과 사용자 상호작용을 포함하는 기능 단위. (예: 메뉴 추천, 퀴즈 풀기)
-   **`entities`**: 비즈니스 핵심 데이터와 관련된 컴포넌트. (예: `MenuCard`, `RestaurantCard`)
-   **`shared`**: 모든 계층에서 재사용 가능한 공통 코드. (예: UI 컴포넌트, 타입, 유틸리티 함수)

---

## 3. 기술 스택

-   **프레임워크**: Next.js (App Router)
-   **언어**: TypeScript
-   **패키지 매니저**: Yarn Berry
-   **스타일링**: Tailwind CSS, shadcn/ui
-   **데이터 페칭/서버 상태관리**: `@tanstack/react-query` (Toss 라이브러리 사용 원칙)
-   **클라이언트 상태관리**: React Context API 또는 Zustand (필요시 최소한으로 사용)
-   **아이콘**: `lucide-react`
-   **테스트**: Vitest, React Testing Library

---

## 4. 개발 단계별 계획 (FSD 공식 튜토리얼 기반)

본 프로젝트는 FSD 공식 튜토리얼의 흐름을 따라 **Top-Down 방식**으로 진행합니다. 즉, 눈에 보이는 페이지부터 시작하여 점차 내부 로직을 구체화합니다.

### Phase 1: 페이지 레이아웃 구성 (Pages Layer)
-   **목표**: 기본 폴더 구조를 만들고, 페이지가 렌더링되는 기본 레이아웃을 설정합니다.
-   **작업 내용**:
    1.  FSD 폴더 구조(`app`, `pages`, `widgets`, `features`, `entities`, `shared`) 생성.
    2.  `app/page.tsx`를 만들고 Figma 디자인 가이드에 따라 초기 화면 구성.
    3.  `app/layout.tsx`에서 전역 폰트(Pretendard) 및 `globals.css` 스타일 적용.

### Phase 2: 공유 UI 및 타입 정의 (Shared Layer)
-   **목표**: 프로젝트 전반에서 사용될 재사용 가능한 UI 컴포넌트와 타입을 정의합니다.
-   **작업 내용**:
    1.  **`shared/ui`**: `shadcn/ui`를 활용해 `Button`, `Card` 등 원자적 UI 컴포넌트 추가.
    2.  **`shared/types`**: `Menu`, `Restaurant` 등 핵심 타입 정의.

### Phase 3: 핵심 엔티티 정의 (Entities Layer)
-   **목표**: 비즈니스 데이터의 핵심 단위를 표현하는 컴포넌트를 만듭니다.
-   **작업 내용**:
    1.  **`entities/menu`**: 메뉴 데이터를 받아 표시하는 `MenuCard` 컴포넌트 구현.
    2.  **`entities/restaurant`**: 맛집 데이터를 받아 표시하는 `RestaurantCard` 컴포넌트 구현.

### Phase 4: 기능 구현 (Features Layer)
-   **목표**: 사용자 상호작용과 비즈니스 로직을 구현합니다.
-   **작업 내용**:
    1.  **`features/recommend-menu`**: 메뉴 추천 로직을 포함한 컴포넌트 구현.
    2.  **`features/menu-quiz`**: 퀴즈 풀기 기능을 포함한 `MenuQuiz` 컴포넌트 구현.

### Phase 5: 위젯 조립 (Widgets Layer)
-   **목표**: `features`와 `entities`를 조합하여 독립적인 UI 블록을 만듭니다.
-   **작업 내용**:
    1.  `widgets/recommendation-form`: 메인 추천 영역 위젯.
    2.  `widgets/menu-list`: 추천된 메뉴 목록을 보여주는 위젯.
    3.  `widgets/restaurant-sheet`: 맛집 리스트를 보여주는 하단 시트 위젯.

### Phase 6: 페이지 완성 및 API 연동
-   **목표**: 위젯들을 조립하여 페이지를 완성하고, 실제 데이터가 흐르도록 API를 연동합니다.
-   **작업 내용**:
    1.  **`app/page.tsx`**: 생성된 `widgets`를 조합하여 최종 페이지 완성.
    2.  **API Routes 구축**: `/api/recommendations` 등 Mock API 엔드포인트 생성.
    3.  **`@tanstack/react-query` 연동**: API 호출 및 서버 상태 관리 설정.

---

## 5. 협업 및 워크플로우

-   **브랜치 전략**:
    -   기능 개발: `feature/기능-요약` (예: `feature/menu-quiz`)
    -   버그 수정: `fix/버그-요약`
    -   메인 브랜치: `main`
-   **Pull Request (PR) 프로세스**:
    -   PR 제목은 변경 내용을 명확히 알 수 있도록 작성합니다. (예: `feat: 메뉴 퀴즈 기능 구현`)
    -   PR 본문에는 작업 내용, 스크린샷 등을 상세히 기술합니다.
    -   상대방의 코드 리뷰 및 승인(Approve) 후 `main` 브랜치에 병합합니다.
-   **커밋 메시지**: `[타입]: 요약` 형식으로 작성합니다. (예: `feat: 메뉴 카드 컴포넌트 추가`, `fix: CSS 깨짐 현상 수정`)

---

*이 문서는 살아있는 문서(Living Document)로, 프로젝트 진행 상황에 따라 언제든지 수정될 수 있습니다.*
