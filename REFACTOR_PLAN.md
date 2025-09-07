# API 타입 리팩토링 계획

이 문서는 "업계 표준 패턴"에 따라 메뉴 관련 타입을 재정의하여, 현재 발생하는 모든 타입 에러를 근본적으로 해결하기 위한 작업 계획서입니다.

---

## 최종 합의된 작명 전략

- **핵심 엔티티 타입:** `Menu`
  - '메뉴'라는 데이터의 단일 객체에 대한 완전한 형태를 정의합니다.
  - `id`, `name`, `category`, `description`, `image` 등 모든 속성을 포함합니다.
- **API 응답 타입:** `GetMenuRecommendationResponse`
  - API가 반환하는 값의 타입을 정의합니다.
  - 핵심 엔티티 타입을 재사용하여 `Menu[]` (Menu의 배열)로 정의합니다.
  - `export type GetMenuRecommendationResponse = Menu[];` 와 같은 형태가 됩니다.

---

## 실행 계획

아래 3단계에 걸쳐 관련된 모든 파일을 수정합니다.

### 1단계: 중심 타입 정의 수정

가장 먼저, 모든 타입의 기준점이 될 `recommendation.ts` 파일을 수정합니다.

- **파일:** `src/modules/home/types/recommendation.ts`
- **수정 내용:** 아래의 전체 코드로 파일을 덮어씁니다.

```typescript
import {categoryEnum} from "@/db/schema";

/**
 * 추천 메뉴 조회 API 요청 타입
 */
export interface GetMenuRecommendationRequest {
    category: typeof categoryEnum.enumValues[number] | 'all';
}

/**
 * 메뉴 객체에 대한 핵심 엔티티 타입
 */
export interface Menu {
    id: number;
    name: string;
    category: typeof categoryEnum.enumValues[number];
    description?: string;
    image?: string;
}

/**
 * 추천 메뉴 조회 API 반환 타입 (Menu의 배열)
 */
export type GetMenuRecommendationResponse = Menu[];
```

### 2단계: 서버 API 응답 수정

서버가 새로운 타입 정의에 맞춰 정확한 형태의 데이터를 반환하도록 수정합니다.

- **파일:** `src/app/api/recommendations/menus/route.ts`
- **수정 내용:** `GetMenuRecommendationResponse`가 이제 `Menu[]`를 의미하므로, 서버는 `{ menus: ... }` 객체가 아닌 메뉴 배열을 직접 반환해야 합니다. 아래의 전체 코드로 파일을 덮어씁니다.

```typescript
import {NextRequest, NextResponse} from "next/server";
import {GetMenuRecommendationRequest, GetMenuRecommendationResponse, Menu} from "@/modules/home/types/recommendation";
import {db} from "@/db";
import {menus} from "@/db/schema";
import {eq, sql} from "drizzle-orm";

export async function GET(request: NextRequest) {
    const {searchParams} = request.nextUrl;
    const category = searchParams.get('category') as GetMenuRecommendationRequest['category'];

    if (!category) {
        return NextResponse.json({message: '카테고리 정보가 필요합니다.'}, {status: 400})
    }

    try {
        let query = db.select().from(menus).$dynamic();

        if (category !== 'all') {
            query = query.where(eq(menus.category, category))
        }

        const recommendedMenusFromDb = await query.orderBy(sql`RANDOM()`).limit(5);

        const clientReadyMenus: GetMenuRecommendationResponse = recommendedMenusFromDb.map(menu => ({
            ...menu,
            description: menu.description ?? undefined,
            image: menu.image ?? undefined,
        }));

        return NextResponse.json(clientReadyMenus);
    } catch (error) {
        console.error('메뉴 추천 중 에러 발생', error);
        return NextResponse.json({message: '서버 내부 오류가 발생했습니다.'}, {status: 500})
    }
}
```

### 3단계: UI 컴포넌트 타입 수정

데이터를 사용하는 UI 컴포넌트들의 타입을 새로운 정의에 맞게 최종 수정합니다.

#### 3-1. `MainRecommendationResult.tsx` 수정
- **파일:** `src/modules/home/ui/views/main-recommendation-result.tsx`
- **수정 내용:** `menus` prop의 타입을 `GetMenuRecommendationResponse` (즉, `Menu[]`)로 변경합니다.

```typescript
// 파일 상단 import 부분
import {GetMenuRecommendationResponse} from "@/modules/home/types/recommendation";
// ... 기존 다른 import

// Props 인터페이스 부분
interface MainRecommendationResultProps {
    menus: GetMenuRecommendationResponse;
    selectedCategory: CategoryType;
}
```

#### 3-2. `MenuCard.tsx` 수정
- **파일:** `src/modules/home/ui/components/MenuCard.tsx`
- **수정 내용:** `menu` prop의 타입을 `Menu`로 변경합니다.

```typescript
// 파일 상단 import 부분
import {Menu} from "@/modules/home/types/recommendation";
// ... 기존 다른 import

// Props 인터페이스 부분
interface MenuCardProps {
    menu: Menu;
}
```

---

## 최종 확인

위 3단계의 수정이 모두 완료되면, 프로젝트 전체에서 메뉴 데이터 타입이 통일되어 모든 타입 에러가 해결될 것입니다.
