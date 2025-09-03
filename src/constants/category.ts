export const DB_CATEGORIES = [
    {id: '한식', name: '한식', emoji: '🇰🇷'},
    {id: '양식', name: '양식', emoji: '🍝'},
    {id: '일식', name: '일식', emoji: '🍣'},
    {id: '중식', name: '중식', emoji: '🥢'},
    {id: '아시안', name: '아시안', emoji: '🍜'},
    {id: '분식', name: '분식', emoji: '🍢'},
    {id: '카페', name: '카페', emoji: '☕'}
] as const; // 'as const'를 붙여서 타입 추론을 더 정확하게 만듭니다.

export const UI_CATEGORIES = [
    {id: 'all', name: '전체', emoji: '🍽️'},
    ...DB_CATEGORIES
] as const;

export const dbCategoryNames = DB_CATEGORIES.map(c => c.id) as [string, ...string[]];
