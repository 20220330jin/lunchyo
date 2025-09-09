// 유효성 검사용 스키마
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db";
import {restaurants, reviews} from "@/db/schema";
import {and, desc, eq} from "drizzle-orm";
import {CreateReviewRequest} from "@/modules/review/type/review.type";
import {badRequestResponse, internalServerErrorResponse} from "@/lib/api-response";

export async function POST(request: NextRequest) {
    try {
        const body: CreateReviewRequest = await request.json();
        const {
            kakaoPlaceId,
            restaurantName,
            restaurantAddress,
            rating,
            content,
            authorName,
        } = body;
        console.log('body', body);

        if (!kakaoPlaceId || !restaurantName || !rating) {
            console.log('kakaoPlaceId', kakaoPlaceId, 'restaurantName', restaurantName, rating);

            return NextResponse.json('모든 값을 입력해주세요.')
        }

        const [newReview] = await db.transaction(async (tx) => {
            let [restaurant] = await tx
                .select()
                .from(restaurants)
                .where(eq(restaurants.kakaoPlaceId, kakaoPlaceId));

            if (!restaurant) {
                [restaurant] = await tx
                    .insert(restaurants)
                    .values({
                        kakaoPlaceId: kakaoPlaceId,
                        name: restaurantName,
                        address: restaurantAddress
                    })
                    .returning()
            }

            const [createReview] = await tx
                .insert(reviews)
                .values({
                    restaurantId: restaurant.id,
                    rating,
                    content: content || '',
                    authorName: authorName || '익명',
                })
                .returning();

            return [createReview];
        })

        return NextResponse.json(newReview, {status: 201})

    } catch (error) {
        console.error('error', error);
        return internalServerErrorResponse(error)

    }
}

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = request.nextUrl;
        const kakaoPlaceId = searchParams.get('kakaoPlaceId');

        if (!kakaoPlaceId) {
            return badRequestResponse('레스토랑 정보가 없습니다.');
        }

        const restaurantResult = await db
            .select({
                id: restaurants.id
            })
            .from(restaurants)
            .where(eq(restaurants.kakaoPlaceId, kakaoPlaceId));

        if (restaurantResult.length === 0) {
            return NextResponse.json([]);
        }

        const restaurantId = restaurantResult[0].id;

        const result = await db
            .select({
                reviewId: reviews.id,
                restaurantId: reviews.restaurantId,
                rating: reviews.rating,
                content: reviews.content,
                authorName: reviews.authorName,
                delYn: reviews.delYn,
                createdAt: reviews.createdAt,
                updatedAt: reviews.updatedAt,
            })
            .from(reviews)
            .where(and(
                eq(reviews.delYn, 'N'),
                eq(reviews.restaurantId, restaurantId)
            ))
            .orderBy(desc(reviews.createdAt))

        return NextResponse.json(result)

    } catch (error) {
        console.error('리뷰 조회 중 서버 내부 오류 발생', error);
        return internalServerErrorResponse(error);
    }
}
