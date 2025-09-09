import dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// 1. 환경 변수를 먼저 로드합니다.
dotenv.config({ path: '.env.local' });

async function runMigrations() {
  console.log('🚀 마이그레이션을 시작합니다...');

  try {
    // 2. 환경 변수가 로드된 후, DB 모듈을 동적으로 가져옵니다.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { db, client } = await import('./index');

    // 3. 마이그레이션을 실행합니다.
    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('✅ 마이그레이션이 성공적으로 완료되었습니다.');

  } catch (error) {
    console.error('❌ 마이그레이션 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

runMigrations();
