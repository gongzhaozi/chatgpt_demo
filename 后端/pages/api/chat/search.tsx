// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
// _mock
// import { contacts } from 'src/_mock/_chat';
import { IChatContact } from './@type/chat';
import { getContactsById } from './chat_general';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);

    // const result = await getContact();
    // const contacts: IChatContact[] = Object.values(result) as IChatContact[];

    const userId = req.query.userId as string;
    const contacts: IChatContact[] = (await getContactsById(userId)) as IChatContact[];

    const { query } = req.query;
    let results = contacts;
    if (query) {
      const cleanQuery = `${query}`.toLowerCase().trim();

      results = results.filter((contact) => contact.name.toLowerCase().includes(cleanQuery));
    }
    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
