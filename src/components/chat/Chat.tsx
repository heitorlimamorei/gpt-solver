import React from 'react';
import Image from 'next/image';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github_dark';
import Logo from '../../../public/ai.png';
import Profile from '../../../public/profile.jpg';

export interface IMessage {
  role: string;
  content: string;
}

interface IChatProps {
  messages: IMessage[];
}

export default function Chat(props: IChatProps) {
  function extractCodeBlocks(message: IMessage): React.ReactNode[] {
    const { content } = message;
    const codeRegex = /```(ts|js|java|python)(.*?)```/gs;

    let modifiedContent: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    while ((match = codeRegex.exec(content)) !== null) {
      const codeBlock = match[2].trim();
      const language = match[1] === 'ts' ? 'typescript' : match[1];
      const codeBlockWithMode = (
        <AceEditor
          key={`ace-${lastIndex}`}
          placeholder="Placeholder Text"
          mode={language}
          theme="github_dark"
          name="blah2"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={codeBlock}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      );

      // Text before code block
      if (lastIndex !== match.index) {
        modifiedContent.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, match.index)}
          </span>,
        );
      }

      // Code block
      modifiedContent.push(codeBlockWithMode);

      lastIndex = match.index + match[0].length;
    }

    // Text after last code block
    if (lastIndex < content.length) {
      modifiedContent.push(
        <span key={`text-${lastIndex}`}>{content.substring(lastIndex)}</span>,
      );
    }

    return modifiedContent;
  }

  return (
    <ul className="flex flex-col md:items-center w-full h-full px-3 sm:px-20 md:px-72 overflow-y-scroll">
      {props.messages.map((m, index) => (
        <li key={index} className="flex flex-col w-full px-3 mt-7">
          <div className="flex flex-row">
            <Image
              width={30}
              height={30}
              alt="Ai logo"
              src={
                m.role === 'system' || m.role === 'assistant' ? Logo : Profile
              }
              className="mr-5 rounded-full"
            />
            <div className="font-bold self-center bg-transparent">
              {m.role === 'system' || m.role === 'assistant' ? 'AI' : 'Você'}
            </div>
          </div>
          <p className="mt-2 ml-[3rem] text-sm">{extractCodeBlocks(m)}</p>
        </li>
      ))}
    </ul>
  );
}
