import {useMutation} from "@tanstack/react-query";
import {GetMenuRecommendationRequest} from "@/modules/home/types/recommendation";
import {getMenuRecommendations} from "@/modules/home/api/get-menu-recommendation";

export const useMenuRecommendationMutation = () => {
    return useMutation({
        mutationFn: (params: GetMenuRecommendationRequest) => getMenuRecommendations(params),
    })
}
