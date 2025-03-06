import modelsMap from '@/data/models';
import { AImodels } from '@/types/aimodels';
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

export async function POST(request: Request) {
  try {
    const { conversation, model } = await request.json();

    if (conversation.length == 0) {
      throw new Error('Error: No conversation found');
    }

    let temp = conversation.map((c: any) => ({
      ...c,
      role: c.role == 'system' ? 'user' : c.role,
    }));

    if (!checkConversation(conversation)) {
      throw new Error('Error: Conversation invalid: (malformed body)');
    }

    const reponse = await openai.chat.completions.create({
      model: modelsMap[model as AImodels].model,
      messages: model == 'o1' || model == 'o1 mini' ? temp : conversation,
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
