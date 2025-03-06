import { AImodels } from '@/types/aimodels';

interface IRequestMessage {
  role: string;
  content: string;
}

type writterFunction = (message: string) => string;

interface IChatStream {
  conversation: IRequestMessage[];
  handleChange(w: writterFunction): void;
  url: string;
  model: AImodels;
}

export default async function ChatStream({ conversation, handleChange, url, model }: IChatStream) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      conversation: conversation,
      model: model,
    }),
  });

  const reader = resp.body?.getReader();

  if (!reader) return;

  let lastChuck = '';

  while (true) {
    const { value, done } = await reader?.read();

    if (done) {
      break;
    }

    let currentChunck = new TextDecoder().decode(value);

    if (currentChunck != null && currentChunck != lastChuck) {
      handleChange((m) => {
        let result = m;

        if (currentChunck != lastChuck) {
          result = result + currentChunck;
        }

        lastChuck = currentChunck;

        return result;
      });
    }
  }
}
