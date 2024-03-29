import { initialDevloperMessages } from '@/data/messages';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

interface IMessage {
  role: 'assistant' | 'system' | 'user';
  content: any;
}

const checkConversation = (messages: IMessage[]): boolean => {
  let result: boolean = true;

  messages.forEach((message) => {
    if (message.role == 'assistant' || message.role == 'system' || message.role == 'user') {
      result = true;
    } else {
      result = false;
    }
    if (!!message.content) {
      result = true;
    } else {
      result = false;
    }
  });
  return result;
};

const prepareConversation = (messages: IMessage[], mode: string) => {
  let finalConversation: IMessage[] = [];

  if (mode == 'devloper') {
    finalConversation = [...initialDevloperMessages, ...messages];
  }

  return finalConversation;
};

export async function POST(request: Request) {
  try {
    const { conversation } = await request.json();

    if (conversation.length == 0) {
      throw new Error('Error: No conversation found');
    }

    if (!checkConversation(conversation)) {
      throw new Error('Error: Conversation invalid: (malformed body)');
    }

    const conversationF = prepareConversation(conversation, 'devloper');

    const reponse = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: conversationF,
      stream: true,
    });

    const stream = OpenAIStream(reponse);

    return new StreamingTextResponse(stream);
  } catch (err: any) {
    return new Response(err.message, {
      status: 400,
      headers: {
        'Content-Type': 'text/json',
      },
    });
  }
}
