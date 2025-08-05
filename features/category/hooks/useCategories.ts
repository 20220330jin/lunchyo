import { useQuery } from "@tanstack/react-query";
import {
  CategoryDisplayItem,
  GetCategoriesResponse,
} from "@/features/category/types";
import { getCategories } from "@/features/category/api/getCategories";

export const useCategories = () => {
  return useQuery<GetCategoriesResponse, Error, CategoryDisplayItem[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5분
    select: (data: GetCategoriesResponse): CategoryDisplayItem[] => {
      return data.map((category) => ({
        id: category.id,
        name: category.name,
        emoji: category.emoji,
      }));
    },
  });
};
