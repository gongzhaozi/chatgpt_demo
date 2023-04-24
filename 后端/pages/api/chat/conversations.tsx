// next
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'src/utils/cors';
// _mock
// import { conversations } from 'src/_mock/_chat';
import { getConversationsById } from './chat_general';
// ----------------------------------------------------------------------
import { IChatConversation } from './@type/chat';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  const userId = req.query.UserID as string;

  const conversations: IChatConversation[] = (await getConversationsById(
    userId
  )) as IChatConversation[];

  res.status(200).json({ conversations });
}
