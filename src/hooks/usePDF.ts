import axios from "axios";
const api = 'https://gpt-solver-backend.onrender.com';

export default function usePDF() {
    async function ExtractText(pdf: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', pdf);

        const resp = await axios.post(`${api}/v1/pdf/text-extractor`, formData);

        if (resp.status !== 200) throw new Error("Error when extracting pdf data");

        const text = resp.data as string;

        return text;
    }

    return {
        ExtractText
    };
}