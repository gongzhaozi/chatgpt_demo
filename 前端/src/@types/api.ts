// export type ChatAPI = {
//   model: string;
//   messages: ChatMessage[];
//   temperature?: number;
//   stream?: boolean;
//   n?: number;
// };

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};
