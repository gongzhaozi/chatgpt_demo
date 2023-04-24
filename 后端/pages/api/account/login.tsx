import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'src/utils/cors';
import { User } from './@type/chat';
import { getUserLoginInfoByEmail } from './account_general';
// ----------------------------------------------------------------------

const JWT_SECRET = 'minimal-secret-key';

const JWT_EXPIRES_IN = '3 days';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);

    const { email, password } = req.body;

    const result: User[] = (await getUserLoginInfoByEmail(email)) as User[];
    // const users: User[] = JSON.parse(JSON.stringify(Object.values(result)));
    // const users: User[] = Object.values(result) as User[];
    // const users: User[] = Object.values(result) as User[];
    const user = result.find((_user) => _user.email === email);

    if (!user) {
      return res.status(400).json({
        message: 'There is no user corresponding to the email address.',
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Wrong password',
      });
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
