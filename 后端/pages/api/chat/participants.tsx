// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
// _mock
import { getContactsById, getUserInfoByIds } from './chat_general';
import { IChatParticipant } from './@type/chat';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);

    const conversationKey = req.query.conversationKey as string;

    const participants: IChatParticipant[] = (await getUserInfoByIds([
      conversationKey,
    ])) as IChatParticipant[];

    if (participants) {
      return res.status(200).json({ participants });
    }

    // 可能要添加群聊

    return res.status(404).json({
      message: 'Unable to find the participants',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
