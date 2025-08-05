// prisma/seed.ts
// --- [수정 1] ---
// PrismaClient 임포트 경로를 올바른 상대 경로로 수정합니다.
// prisma/seed.ts (현재 위치)에서 ../lib/generated/prisma (생성된 클라이언트 위치)로 접근합니다.
import { PrismaClient } from "../lib/generated/prisma";
import * as process from "node:process";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 기존 데이터 삭제 (시딩을 여러 번 실행해도 중복되지 않도록)
  await prisma.categories.deleteMany({});
  console.log("Deleted existing categories.");

  const categoriesData = [
    { name: "한식", emoji: "🇰🇷", description: "한국 전통 음식" },
    { name: "양식", emoji: "🍝", description: "서양식 음식" },
    { name: "일식", emoji: "🍣", description: "일본 전통 음식" },
    { name: "중식", emoji: "🥢", description: "중국 전통 음식" },
    { name: "아시안", emoji: "🍜", description: "아시아 각국의 음식" },
    { name: "분식", emoji: "🍢", description: "간단한 분식류" },
    { name: "카페", emoji: "☕", description: "커피 및 음료" },
    { name: "전체", emoji: "🍽️", description: "모든 카테고리" },
  ];

  for (const data of categoriesData) {
    await prisma.categories.create({
      data: {
        name: data.name,
        emoji: data.emoji,
        description: data.description,
        delYn: false, // 기본값
        regUser: "system", // 시딩 사용자
        modUser: "system", // 시딩 사용자
      },
    });
  }
  // --- [수정 2] ---
  // "Seeding finished." 로그를 for 루프 밖으로 이동합니다.
  console.log("Seeding finished.");
}

// --- [수정 3] ---
// main 함수를 파일의 최하단에서 한 번만 호출합니다.
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
