import {CreateMenuRequest} from "@/modules/admin/types/admin.api.type";

export const adminInitializer = {
    INITIAL_MENU_PARAM: {
        name: '',
        categoryId: 'all',
        description: '',
        image: '',
    } as CreateMenuRequest
}
