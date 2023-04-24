// config
import { HOST_API } from '../../config';

import { NextApiRequest, NextApiResponse } from 'next';
import { sqlQuery } from '../../pages/lib/db';
import cors from 'src/utils/cors';

// ----------------------------------------------------------------------

export const JWT_SECRET = 'minimal-secret-key';

export const JWT_EXPIRES_IN = '3 days';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  try {
    const querySql = 'select * from users where email = ? ';
    const valuesParams = ['demo@gmail.com'];
    const users = await sqlQuery(querySql, valuesParams);
    console.log('user是：', users);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const users = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: '聪明的小天才111',
    email: 'demo@gmail.com',
    password: 'Demo@1234',
    photoURL: `${HOST_API}/assets/images/avatars/avatar_default.jpg`,
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: '管理员',
    isPublic: true,
  },
];
