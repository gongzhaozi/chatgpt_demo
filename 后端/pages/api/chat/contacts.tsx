// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
// _mock
// import { contacts } from 'src/_mock/_chat';
import { getContactsById } from './chat_general';
import { IChatContact } from './@type/chat';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  const userId = req.query.UserID as string;

  const contacts: IChatContact[] = (await getContactsById(userId)) as IChatContact[];

  res.status(200).json({ contacts });
}
