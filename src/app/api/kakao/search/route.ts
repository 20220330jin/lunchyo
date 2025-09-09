import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    console.log('1. API Route 시작');
    const {searchParams} = request.nextUrl;
    const query = searchParams.get('query');
    const x = searchParams.get('x'); // 경도
    const y = searchParams.get('y'); // 위도
    const radius = searchParams.get('radius'); // 반경

    if (!query) {
        return NextResponse.json({message: '검색어가 필요합니다.'}, {status: 400});
    }

    // 환경 변수에서 카카오 REST API 키를 가져옵니다.
    const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    console.log(process.env.KAKAO_REST_API_KEY);
    console.log('2. KAKAO_REST_API_KEY:', KAKAO_REST_API_KEY ? '설정됨' : '설정 안됨');

    if (!KAKAO_REST_API_KEY) {
        return NextResponse.json({message: '카카오 REST API 키가 설정되지 않았습니다.'}, {status: 500});
    }

    const kakaoApiUrl = new URL('https://dapi.kakao.com/v2/local/search/keyword.json');
    kakaoApiUrl.searchParams.append('query', query);
    if (x && y) {
        kakaoApiUrl.searchParams.append('x', x);
        kakaoApiUrl.searchParams.append('y', y);
        if (radius) {
            kakaoApiUrl.searchParams.append('radius', radius);
        }
    }
    kakaoApiUrl.searchParams.append('category_group_code', 'FD6'); // 음식점 카테고리 코드

    try {
        console.log('3. fetch 요청 URL:', kakaoApiUrl.toString());
        const response = await fetch(kakaoApiUrl.toString(), {
            headers: {
                Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
                'Origin': 'http://localhost:3000',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
                'Referer': 'http://localhost:3000'
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('카카오 API 오류:', errorData);
            return NextResponse.json({message: '카카오 API 호출 실패', details: errorData}, {status: response.status});
        }

        const data = await response.json();
        console.log('5. 카카오 API 응답 완료');
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Route 내부 오류:', error);
        return NextResponse.json({message: '서버 내부 오류'}, {status: 500});
    }
}
