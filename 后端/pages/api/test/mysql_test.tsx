import { NextApiRequest, NextApiResponse } from 'next';
import { sqlQuery } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const querySql = 'select * from test where id = ?';
    const valuesParams = ['2'];
    const data = await sqlQuery(querySql, valuesParams);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}
