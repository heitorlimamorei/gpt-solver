import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface IMessage {
  role: string;
  content: string;
  name?: string;
}

export const runtime = 'edge';

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

const checkGPTModel = (model: string): boolean => {
  if (model == 'gpt-4-turbo-preview' || model == 'gpt-4' || model == 'gpt-3.5-turbo-0125') {
    return true;
  }
  return false;
};

export async function POST(request: Request) {
  try {
    const { conversation, model, userId } = await request.json();

    if (!checkGPTModel(model)) {
      throw new Error('Error: Recived invalid GPT model');
    }

    if (conversation.length == 0) {
      throw new Error('Error: No conversation found');
    }

    if (!checkConversation(conversation)) {
      throw new Error('Error: Conversation invalid: (malformed body)');
    }

    const reponse = await openai.chat.completions.create({
      model: 'gpt-4o-2024-05-13',
      messages: conversation,
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
