import { useRef, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Stack,
  InputBase,
  alpha,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';

import { useSnackbar, VariantType, SnackbarOrigin } from 'src/components/snackbar';

import { fetchChatGPTAnswer } from 'src/sections/@dashboard/openai/openai_api';

import { Helmet } from 'react-helmet-async';

import { ChatMessage } from 'src/@types/api';

import { ChatCard } from '../../sections/@dashboard/openai/components';

export default function TestPage() {
  const [systemInputValue, setSystemInputValue] = useState('');

  const [chatInputValue, setChatInputValue] = useState('');

  const [chatCardMessages, setCardMessage] = useState<ChatMessage[]>([]);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // 监听chatCardMessages，当发生变化时，chartcard移动到最下面
  const chatCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatCardRef.current) {
      const scrollRef: HTMLElement = chatCardRef.current.querySelector(
        '.simplebar-content-wrapper'
      ) as HTMLElement;
      const innerRef: HTMLElement = chatCardRef.current.querySelector(
        '.simplebar-content'
      ) as HTMLElement;
      if (scrollRef && innerRef) {
        scrollRef.scrollTop = innerRef.offsetHeight - scrollRef.offsetHeight;
      }
    }
  }, [chatCardMessages]);

  // Snackbar设置
  const { enqueueSnackbar } = useSnackbar();

  const onSnackbarAction = (text: string, color: VariantType, anchor?: SnackbarOrigin) => {
    enqueueSnackbar(text, {
      variant: color,
      anchorOrigin: anchor,
    });
  };

  // 发送按钮点击设置
  const addChatCard = (newChat: ChatMessage) => {
    setCardMessage((prevMessages) => [...prevMessages, newChat]);
  };

  const handleSystemInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystemInputValue(event.target.value);
  };

  const handleChatInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInputValue(event.target.value);
  };

  const handleSendButtonClick = async () => {
    // 禁用按钮;
    setButtonDisabled(true);
    try {
      // 等待sendMessage函数完成
      await sendMessage();
      // 发送完成后启用按钮
      setButtonDisabled(false);
    } catch (error) {
      // 发生错误时启用按钮
      setButtonDisabled(false);
    }
  };

  const sendMessage = async () => {
    setChatInputValue('');
    if (chatInputValue) {
      let finalMessages: ChatMessage[] = [];
      const userMessage: ChatMessage = { role: 'user', content: chatInputValue };
      if (systemInputValue) {
        finalMessages = [
          { role: 'system', content: systemInputValue },
          ...chatCardMessages,
          { ...userMessage },
        ];
      } else {
        finalMessages = [...chatCardMessages, { ...userMessage }];
      }
      // const test = {
      //   role: 'assistant',
      //   content: '你好，我是您的智能机器人，请问我有什么可以帮助您的？',
      // } as ChatMessage;
      // addChatCard(test);
      addChatCard(userMessage);
      try {
        const response = await fetchChatGPTAnswer('gpt-3.5-turbo', finalMessages);
        // const { chatGPTReplys } = response.data;
        // const message: ChatMessage = chatGPTReplys[0].message as ChatMessage;
        // addChatCard(message);
        // fetchChatGPTAnswer('gpt-3.5-turbo', finalMessages).then((res) => {
        //   console.log(res);
        // });
      } catch (error) {
        console.error('请求GPT接口时候报错', error);
      }
    }
  };

  // 重置按钮点击设置
  const handleResetButtonClick = () => {
    setCardMessage([]);
  };

  // 输入框按回车按钮设置
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      // Ctrl+Enter和command+Enter触发换行，其他情况按回车发送
      if ((event.key === 'Enter' && event.ctrlKey) || (event.key === 'Enter' && event.metaKey)) {
        event.preventDefault();
        const newChatInputValue = `${chatInputValue} \n`;
        setChatInputValue(newChatInputValue);
      } else {
        event.preventDefault();
        handleSendButtonClick();
      }
    }
  };

  return (
    <>
      <Helmet>
        <title> ChatGPT接口测试页</title>
      </Helmet>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px', // 设置组件之间的间距
        }}
      >
        <Typography variant="h3" component="h1" paragraph>
          ChatGPT接口测试
        </Typography>
        <Card
          sx={{ p: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            variant="outlined"
            rows={1}
            fullWidth
            label="系统参数"
            id="systemvalue"
            onChange={handleSystemInputChange}
          />
        </Card>

        <Card
          ref={chatCardRef}
          sx={{
            p: 3,
            width: '100%',
            height: '500px',
            display: 'fill',
            flexDirection: 'column',
            padding: '0px',
          }}
        >
          <Scrollbar>
            {chatCardMessages.map((chatMessage, index) => (
              <ChatCard
                key={index}
                text={chatMessage.content}
                sendType={chatMessage.role === 'user' ? 'send' : 'receive'}
              />
            ))}
          </Scrollbar>
        </Card>
        <Card
          sx={{ p: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <InputBase
            multiline
            fullWidth
            rows={4}
            placeholder="请输入您想要问的话。。。"
            value={chatInputValue}
            onKeyDown={handleKeyDown}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 1,
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
            }}
            onChange={handleChatInputChange}
          />
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button
              variant="contained"
              onClick={handleResetButtonClick}
              color="error"
              disabled={buttonDisabled}
            >
              重置
            </Button>

            <Button variant="contained" onClick={handleSendButtonClick} disabled={buttonDisabled}>
              发送
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  );
}

// function websocket_test() {
// 创建 WebSocket 连接
// const socket = new WebSocket('ws://localhost:8080');

// // 监听连接事件
// socket.addEventListener('open', (event) => {
//   console.log('链接WebSocket');

//   // 发送消息给服务器
//   socket.send('Hello, server!');
// });

// // 监听消息事件
// socket.addEventListener('message', (event) => {
//   console.log(`Received message: ${event.data}`);
// });

// // 监听断开连接事件
// socket.addEventListener('close', (event) => {
//   console.log('Disconnected from WebSocket server.');
// });
// }

// onSnackbarAction('你好', 'error', { vertical: 'top', horizontal: 'center' });
