import dotenv from 'dotenv';

// 1. 스크립트 최상단에서 환경 변수를 먼저 설정합니다.
dotenv.config({ path: '.env.local' });

async function runDbTest() {
  console.log('🚀 데이터베이스 연결 테스트를 시작합니다...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');

  try {
    // 2. 환경 변수가 설정된 후, 필요한 모듈들을 동적으로 가져옵니다.
    const { db, client } = await import('../src/db');
    const { sql } = await import('drizzle-orm');

    const result = await db.execute(sql`SELECT 1 + 1 as result`);
    
    if (result.rows.length > 0 && result.rows[0].result === 2) {
      console.log('✅ 데이터베이스 연결에 성공했습니다!');
      console.log('쿼리 결과:', result.rows[0]);
    } else {
      throw new Error('쿼리가 예상대로 실행되지 않았습니다.');
    }

    // 3. 테스트가 끝나면 연결을 종료합니다.
    console.log('👋 데이터베이스 연결을 종료합니다.');
    await client.end();

  } catch (error) {
    console.error('❌ 데이터베이스 연결 또는 쿼리 실행에 실패했습니다.');
    console.error(error);
  }
}

runDbTest();