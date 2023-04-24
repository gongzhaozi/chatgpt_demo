// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';

import { getConversationsById, findConversationFromConversationsById } from '../chat_general';
import { IChatConversation } from '../@type/chat';
import { log } from 'console';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    const userId = req.query.UserID as string;
    const conversationKey = req.query.conversationKey as string;

    const conversations: IChatConversation[] = (await getConversationsById(
      userId
    )) as IChatConversation[];
    console.log('测测测', conversations);

    const conversation = findConversationFromConversationsById(
      conversationKey,
      conversations
    ) as IChatConversation;

    if (conversation) {
      return res.status(200).json({ conversation });
    }

    // 可能要添加群聊

    return res.status(404).json({
      message: 'Unable to find the contact',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
