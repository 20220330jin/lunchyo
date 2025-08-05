import { GetCategoriesResponse } from "@/features/category/types";

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `카테고리 목록을 불러오는 것을 실패했습니다.: ${response.status} ${response.statusText} - ${errorBody}`,
    );
  }

  const data: GetCategoriesResponse = await response.json();
  return data;
};
