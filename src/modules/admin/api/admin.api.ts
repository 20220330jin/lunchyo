import {CreateMenuRequest, GetUploadUrlRequest, GetUploadUrlResponse} from "@/modules/admin/types/admin.api.type";

export const getUploadUrl = async (
    params: GetUploadUrlRequest
): Promise<GetUploadUrlResponse> => {
    const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params),
    })
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Presigned URL을 받아오는데 실패했습니다.');
    }
    return res.json();
}

export const createMenu = async (params: CreateMenuRequest): Promise<{ message: string }> => {
    const res = await fetch('/api/admin/menus', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params),
    })
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '메뉴 생성에 실패했습니다.');
    }
    return res.json();
}
