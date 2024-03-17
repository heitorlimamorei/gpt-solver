import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-monokai';

import { IMessage } from '@/components/chat/Chat';

enum Language {
  bash = 'bash',
  typescript = 'typescript',
  tsx = 'typescript',
  jsx = 'javascript',
  javascript = 'javascript',
  java = 'java',
  python = 'python',
  go = 'golang',
  html = 'html',
  css = 'css',
}

function getLanguage(match: RegExpMatchArray): Language {
  switch (match[1] as Language) {
    case Language.bash:
      return Language.bash;
    case Language.typescript:
      return Language.typescript;
    case Language.tsx:
      return Language.tsx;
    case Language.html:
      return Language.html;
    case Language.css:
      return Language.css;
    case Language.go:
      return Language.go;
    case Language.javascript:
      return Language.javascript;
    case Language.java:
      return Language.java;
    case Language.python:
      return Language.python;
    default:
      return Language.javascript;
  }
}

function generateCodeBlockWithMode(
  codeBlock: string,
  language: Language,
): React.ReactNode {
  const numberOfLines = codeBlock.split('\n').length;

  return (
    <AceEditor
      width="100%"
      height={`calc(20px * ${numberOfLines} + 40px)`}
      placeholder="Placeholder Text"
      mode={language}
      theme="monokai"
      name="blah2"
      fontSize={12}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={codeBlock}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}

function generateTextContent(
  content: string,
  lastIndex: number,
  endIndex: number,
): React.ReactNode {
  return (
    <span key={`text-${lastIndex}`} className="mx-3">
      {content
        .substring(lastIndex, endIndex)
        .split('\n')
        .map((line, index) => (
          <React.Fragment key={`line-${index}`}>
            {line}
            <br />
          </React.Fragment>
        ))}
    </span>
  );
}

export function useFormat(message: IMessage): React.ReactNode[] {
  const { content } = message;
<<<<<<< HEAD

  const codeRegex =
    /```(typescript|tsx|jsx|html|css|go|javascript|java|python|bash||)(.*?)```/gs;
=======
  const codeRegex = /```(typescript|tsx|html|css|go|javascript|java|python)(.*?)```/gs;
>>>>>>> 904e852f648fe14c47aa7b7b922f4661e52b7aaa

  let modifiedContent: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = codeRegex.exec(content)) !== null) {
    const codeBlock = match[2].trim();
    const language = getLanguage(match);

    if (lastIndex !== match.index) {
      modifiedContent.push(
<<<<<<< HEAD
        generateTextContent(content, lastIndex, match.index),
=======
        <span key={`text-${lastIndex}`}>{content.substring(lastIndex, match.index)}</span>,
>>>>>>> 904e852f648fe14c47aa7b7b922f4661e52b7aaa
      );
    }

    modifiedContent.push(generateCodeBlockWithMode(codeBlock, language));

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
<<<<<<< HEAD
    const remainingContent = content.substring(lastIndex);
    // Check if remaining content contains AceEditor component
    if (!remainingContent.includes('<AceEditor')) {
      modifiedContent.push(
        generateTextContent(content, lastIndex, content.length),
      );
    } else {
      modifiedContent.push(
        <span key={`text-${lastIndex}`} className="">
          {remainingContent}
        </span>,
      );
    }
=======
    modifiedContent.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex)}</span>);
>>>>>>> 904e852f648fe14c47aa7b7b922f4661e52b7aaa
  }
  return modifiedContent;
}
