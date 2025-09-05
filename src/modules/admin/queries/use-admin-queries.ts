import {GetMenusRequest} from "@/modules/admin/types/admin.api.type";
import {useQuery} from "@tanstack/react-query";
import {getMenus} from "@/modules/admin/api/admin.api";
import {adminInitializer} from "@/modules/admin/types/admin.initializer";

export const useGetMenusQuery = (params: GetMenusRequest) => {
    return useQuery({
        queryKey: [params],
        queryFn: () => getMenus(params),
        initialData: adminInitializer.INITIAL_MENUS,
    })
}
