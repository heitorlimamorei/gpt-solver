import axios from 'axios';
import OpenAI from 'openai';
import cheerio from 'cheerio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GenerateOptimizedQuery = async (message: string) => {
    const reponse = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt:
        'Act as a Google Search Engine Optimization Expert, and optimize this user query into an optimized Google Search Egine Query: ' +
        message,
      stream: true,
    });

    const reader = reponse.toReadableStream().getReader();

    const decoder = new TextDecoder();

    let query = "";

    while (true) {
        const { value, done } = await reader.read();

      const decodedValue: any = decoder.decode(value);

       if (decodedValue) {
        const parsedValue = JSON.parse(decodedValue);

        query = query + parsedValue.choices[0].text;
       }

        if (done) break;
    }

    return query;
};

const searchGoogle = async (query: string): Promise<string[]> => {
  const response = await axios.get(
    'https://www.googleapis.com/customsearch/v1',
    {
      params: {
        key: 'AIzaSyCi7tb_PPH4-EvmibqeoLG7UXyIc8Ptzvk',
        cx: '97954eef2030947ad',
        q: query,
        num: 3
      },
    },
  );

  return response.data.items;
};

const scrapeTextFromURL = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('script').remove();
    $('style').remove();
    $('noscript').remove();

    const text = $('body').find('p, h1, h2, h3, h4, h5, h6, li').text();

    const cleanText = text.replace(/\s+/g, ' ').trim();

    return cleanText;
  } catch (error) {
    return '';
  }
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const optimizedQuery = await GenerateOptimizedQuery(message);

    const resp = await searchGoogle(optimizedQuery);

    if (!resp) throw new Error("Error when google search");

    const urls:any = resp.map((item) => item.link);

    const webScrapingReqs = urls.map((url: string) => scrapeTextFromURL(url));
    
    const googleContext = await Promise.all(webScrapingReqs);

    return new Response(JSON.stringify(googleContext), {
        status: 200,
        headers: {
          'Content-Type': 'text/json',
        },
      });
  } catch (err: any) {
    return new Response(err.message, {
      status: 400,
      headers: {
        'Content-Type': 'text/json',
      },
    });
  }
}
