import {NextResponse} from "next/server";

/**
 * 400 - Bad Request
 *
 * @author hjkim
 * @param data
 */
export function badRequestResponse(data: string) {
    return NextResponse.json({message: data}, {status: 400})
}

/**
 * 500 - Internal Server Error
 *
 * @author hjkim
 * @param error
 */
export function internalServerErrorResponse(error: unknown) {
    console.error('서버 내부 오류 발생 ', error);
    return NextResponse.json(
        {message: '서버 내부 오류가 발생했습니다.'},
        {status: 500}
    )
}

export function notFoundResponse(resourceName: string = '리소스') {
    return NextResponse.json(
        {message: `${resourceName}을 찾을 수 없습니다.`},
        {status: 404}
    )
}
