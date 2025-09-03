import {NextRequest, NextResponse} from "next/server";
import {GetMenuRecommendationRequest, GetMenuRecommendationResponse} from "@/modules/home/types/recommendation";
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

        const recommendedMenus = await query.orderBy(sql`RANDOM
        ()`).limit(5);

        const response: GetMenuRecommendationResponse = {
            menus: recommendedMenus
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error('메뉴 추천 중 에러 발생', error);
        return NextResponse.json({message: '서버 내부 오류가 발생했습니다.'}, {status: 500})
    }
}
