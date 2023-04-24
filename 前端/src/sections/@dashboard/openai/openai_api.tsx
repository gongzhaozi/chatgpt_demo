import axios from 'src/utils/axios';

import { ChatMessage } from 'src/@types/api';

export async function fetchChatGPTAnswer(
  model: string,
  messages: ChatMessage[],
  temperature?: number,
  stream?: boolean,
  n?: number
) {
  try {
    const response = await axios.post(
      '/api/openai/chatgpt',
      {
        model,
        messages,
        temperature,
        stream: true,
        n,
      },
      {
        headers: {
          Accept: 'text/event-stream',
        },
      }
    );
    // const chatGPTData = await response.json();
    return response;
  } catch (error) {
    return error;
  }
}

// export async function sendRequest() {
//   console.log('发送开始');
//   const url = 'https://api.openai.com/v1/chat/completions';
//   const data = {
//     model: 'gpt-3.5-turbo',
//     messages: [
//       { role: 'system', content: '请用中文回答' },
//       { role: 'user', content: 'hello' },
//     ],
//   };
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer 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', // 替换为你的访问令牌
//   };
//   try {
//     const response = await axios.post(url, data, { headers });
//     console.log('测试成功：', response.data);
//   } catch (error) {
//     console.log('请求失败：', error);
//   }
// }
