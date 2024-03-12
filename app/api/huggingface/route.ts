import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';
import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';
import { NextResponse } from 'next/server';

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        if (!process.env.HUGGINGFACE_API_KEY) {
            return new NextResponse('Missing HuggingFace API key.', { status: 400 });
        }
        const { messages } = await req.json();
        const response = Hf.textGenerationStream({
            model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
            inputs: experimental_buildOpenAssistantPrompt(messages),
            parameters: {
                max_new_tokens: 200,
                // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
                typical_p: 0.2,
                repetition_penalty: 1,
                truncate: 1000,
                return_full_text: false,
            },
        });
        const stream = HuggingFaceStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        return new NextResponse('Something went wrong.', { status: 500 });
    }
};