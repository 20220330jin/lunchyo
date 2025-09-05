import {MenuCategory} from "@/modules/admin/types/admin.type";

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

export interface GetMenusRequest {
    name: string;
}

export interface GetMenusResponse {
    name: string;
    category: MenuCategory;
    description?: string;
    image?: string;
}
