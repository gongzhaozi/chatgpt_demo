import { sq } from 'date-fns/locale';
import mysql from 'mysql2/promise';

export async function sqlQuery(sql: string, values?: Array<string>) {
  const dbconnection = await mysql.createConnection({
    host: 'localhost',
    database: 'chatgpt',
    port: 3306,
    user: 'root',
    password: 'freedom19920927',
  });

  try {
    const formattedQuery = mysql.format(sql, values);
    // console.log('sql测试：', formattedQuery);
    const [results] = await dbconnection.execute(formattedQuery);
    // const [results] = await dbconnection.execute(sql, values);
    dbconnection.end();
    return results;
  } catch (error) {
    return { error };
  }
}
