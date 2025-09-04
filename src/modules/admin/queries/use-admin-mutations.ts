import {useMutation} from "@tanstack/react-query";
import {CreateMenuRequest, GetUploadUrlRequest} from "@/modules/admin/types/admin.api.type";
import {createMenu, getUploadUrl} from "@/modules/admin/api/admin.api";

export const useUploadUrlMutation = () => {
    return useMutation({
        mutationFn: (params: GetUploadUrlRequest) => getUploadUrl(params),
    })
}

export const useCreateMenuMutation = () => {
    return useMutation({
        mutationFn: (params: CreateMenuRequest) => createMenu(params),
    })
}
