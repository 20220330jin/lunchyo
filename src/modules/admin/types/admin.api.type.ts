export interface CreateMenuRequest {
    name: string;
    categoryId: string;
    description?: string;
    image?: string;
}

export interface GetUploadUrlRequest {
    fileName: string;
    fileType: string;
}

export interface GetUploadUrlResponse {
    uploadUrl: string;
    fileUrl: string;
}
