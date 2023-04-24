// config
import { HOST_API } from '../config';

// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
// _mock
import { contacts } from 'src/_mock/_chat';

// ----------------------------------------------------------------------

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  res.status(200).json({ contacts });
}

export default function IndexPage() {
  return <h1>The starting point for your next project v4</h1>;
}
