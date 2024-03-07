import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface IMessage {
  role: string;
  content: string;
  name?: string;
}

interface IConversationPaylod {
  model: string;
  token_limit: number;
  messages: any[];
}

interface IConversationResp {
  id: string;
  message: IMessage;
  usage: {
    total_tokens: number;
  };
}

const generateConversation = async (
  payload: IConversationPaylod,
): Promise<IConversationResp> => {
  const resp = await openai.chat.completions.create({
    model: payload.model,
    messages: payload.messages,
  });

  return {
    id: resp.id,
    message: {
      role: resp.choices[0].message.role,
      content: resp.choices[0].message.content!,
    },
    usage: {
      total_tokens: resp.usage?.total_tokens!,
    },
  };
};

const checkConversation = (messages: IMessage[]): boolean => {
  let result: boolean = true;

  messages.forEach((message) => {
    if (
      message.role == 'assistant' ||
      message.role == 'system' ||
      message.role == 'user'
    ) {
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
  if (
    model == 'gpt-4-turbo-preview' ||
    model == 'gpt-4' ||
    model == 'gpt-3.5-turbo-0125'
  ) {
    return true;
  }
  return false;
};

export async function POST(request: Request) {
  try {
    const { conversation, model } = await request.json();
    let finalConversation: IMessage[] = [...conversation];
    
    if (!checkGPTModel(model)) {
      throw new Error('Error: Recived invalid GPT model');
    }

    if (conversation.length == 0) {
      throw new Error('Error: No conversation found');
    }

    if (!checkConversation(conversation)) {
      throw new Error('Error: Conversation invalid: (malformed body)');
    }

    const resp = await generateConversation({
      model: model,
      token_limit: 32000,
      messages: conversation,
    });

    finalConversation.push(resp.message);

    return new Response(
      JSON.stringify({
        conversation: finalConversation,
        total_tokens: resp.usage.total_tokens,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'text/json',
        },
      },
    );
  } catch (err: any) {
    return new Response(err.message, {
      status: 400,
      headers: {
        'Content-Type': 'text/json',
      },
    });
  }
}
