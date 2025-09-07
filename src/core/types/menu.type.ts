import { categoryEnum } from "@/db/schema";

/**
 * 메뉴 객체에 대한 핵심 엔티티 타입
 */
export interface Menu {
    id: number;
    name: string;
    category: typeof categoryEnum.enumValues[number];
    description?: string;
    image?: string;
}
