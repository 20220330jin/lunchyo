import {CreateMenuRequest, GetMenusRequest, GetMenusResponse} from "@/modules/admin/types/admin.api.type";

export const adminInitializer = {
    INITIAL_MENU_PARAM: {
        name: '',
        categoryId: 'all',
        description: '',
        image: '',
    } as CreateMenuRequest,

    INITIAL_GET_MENUS_REQUEST_PARAM: {
        name: '',
    } as GetMenusRequest,

    INITIAL_MENUS: [
        {
            name: '',
            category: '한식',
            description: '',
            image: '',
        }
    ] as GetMenusResponse[]
}
