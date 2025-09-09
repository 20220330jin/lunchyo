import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db";
import {restaurants, reviews} from "@/db/schema";
import {and, count, eq, inArray} from "drizzle-orm";
import {badRequestResponse, internalServerErrorResponse} from "@/lib/api-response";
import {GetReviewCountsRequest} from "@/modules/review/type/review.type";

export async function POST(request: NextRequest) {
    try {
        const body: GetReviewCountsRequest = await request.json();
        const {kakaoPlaceIds} = body;

        if (!kakaoPlaceIds || !Array.isArray(kakaoPlaceIds)) {
            return badRequestResponse('데이터가 없습니다.');
        }

        if (kakaoPlaceIds.length === 0) {
            return NextResponse.json({counts: []}, {status: 200})
        }

        const result = await db
            .select({
                kakaoPlaceIds: restaurants.kakaoPlaceId,
                reviewCount: count(reviews.id)
            })
            .from(restaurants)
            .leftJoin(reviews, and(
                eq(restaurants.id, reviews.restaurantId),
                eq(reviews.delYn, 'N')
            ))
            .where(inArray(restaurants.kakaoPlaceId, kakaoPlaceIds))
            .groupBy(restaurants.kakaoPlaceId)

        const countsMap = new Map(
            result.map(r => [r.kakaoPlaceIds, r.reviewCount])
        )

        const finalCounts = kakaoPlaceIds.map(id => ({
            kakaoPlaceId: id,
            count: countsMap.get(id) || 0,
        }))

        return NextResponse.json({counts: finalCounts}, {status: 200})
    } catch (error) {
        return internalServerErrorResponse(error);
    }
}
