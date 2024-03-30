interface IRequestMessage {
  role: string;
  content: string;
}

type writterFunction = (message: string) => string;

interface IChatStream {
  conversation: IRequestMessage[];
  handleChange(w: writterFunction): void;
  url: string;
}

export default async function ChatStream({ conversation, handleChange, url }: IChatStream) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      conversation: conversation,
      model: 'gpt-4',
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
