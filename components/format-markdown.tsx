import CopyToClipboard from "@/components/copy-to-clipboard";
import { Message } from "ai";
import { useState } from "react";
import Markdown from "react-markdown";

export default function FormattedMarkdown({ message }: { message: Message }) {
    return (
        <div className='mt-1.5 w-full'>
            <div className='flex'>
                <p className='font-semibold'>Bot</p>
                <CopyToClipboard message={message} className='-mt-1' />
            </div>
            <div className='mt-2 text-sm text-zinc-900'>
                <Markdown>{message.content}</Markdown>
            </div>
        </div>
    );
};
