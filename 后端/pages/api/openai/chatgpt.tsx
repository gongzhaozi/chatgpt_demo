import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'src/utils/cors';
import { ChatAPI, ChatMessage } from './@type/chatgpt';

import axios, { AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------
const url = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer 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', // 替换为你的访问令牌
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    const quest = req.body;

    // const questString = JSON.stringify(quest);

    if (quest.stream) {
      console.log('测试成功');
      // const result = await sendRequest(quest);
      // console.log('结果是：', result);
      // return res.status(200).json({
      //   chatGPTReplys: result,
      // });

      res.setHeader('Content-Type', 'text/event-stream');
      const config: AxiosRequestConfig = {
        url: url,
        method: 'post',
        data: quest,
        headers: {
          ...headers,
          Accept: 'text/event-stream',
        },
        responseType: 'stream',
      };

      // function parseEventData(eventData: string): EventData {
      //   const fields = eventData.split('\n');
      //   const data: EventData = {
      //     event: '',
      //     data: '',
      //   };
      //   fields.forEach((field) => {
      //     const [name, value] = field.split(':');
      //     if (name && value) {
      //       const key = name.trim();
      //       const val = value.trim();
      //       if (key === 'data') {
      //         data[key] += val;
      //       } else {
      //         data[key] = val;
      //       }
      //     }
      //   });
      //   try {
      //     data.data = JSON.parse(data.data);
      //   } catch (err) {}
      //   return data;
      // }

      axios(config).then((response) => {
        response.data.on('data', function (chunk: any) {
          const chunkString = chunk.toString(); // 将数据块转换为字符串
          console.log(chunkString); // 打印解析后的对象
          res.write(chunk);
        });
        response.data.on('error', function (err: any) {
          // 处理错误
          console.log('报错了！！！');
        });
        response.data.on('end', function () {
          console.log('处理结束');
          // 处理数据结束事件
          res.end();
        });
      });
    } else {
      const result = await sendRequest(quest);
      console.log('结果是：', result);
      return res.status(200).json({
        chatGPTReplys: result.choices,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

async function sendRequest(quest: Object) {
  try {
    const response = await axios.post(url, quest, { headers });
    return response.data;
  } catch (error) {
    return error;
  }
}

// Promise异步方法，可以使用：const result = await sendRequest();获得结果
// function sendRequest() {
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

//   return new Promise((resolve, reject) => {
//     axios
//       .post(url, data, { headers })
//       .then((response) => {
//         console.log('测试成功：', response);
//         resolve(response);
//       })
//       .catch((e) => reject(e));
//   });
// }
