// ----------------------------------------------------------------------

export type ChatAPI = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  stream?: boolean;
  n?: number;
};

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// export type ChatResponse = {
//   id?: string;
//   object?: string;
//   created?: Date;
//   model?: string;
//   usage?: ChatResponseUsage;
//   choices: [{ message: [Object]; finish_reason: 'stop'; index: 0 }];
// };

// export type ChatResponseUsage = {
//   prompt_tokens: Number;
//   completion_tokens: Number;
//   total_tokens: Number;
// };
