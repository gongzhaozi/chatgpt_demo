import { sqlQuery } from '../../lib/db';

export async function getUserLoginInfoByEmail(email: string) {
  try {
    const query = `
      SELECT user_id as id, display_name as displayName,email,password, photo_url as photoURL,phone as phoneNumber ,country, address,state,city,zipCode,about,role,is_public as isPublic 
      From user where email = ?`;
    // const query = 'select * from users_test where email = ? ';
    const valuesParams = [email];
    const users = await sqlQuery(query, valuesParams);
    return users;
  } catch (error) {
    return { error };
  }
}
