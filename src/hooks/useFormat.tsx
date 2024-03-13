import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';

import { IMessage } from '@/components/chat/Chat';

enum Language {
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

export function useFormat(message: IMessage): React.ReactNode[] {
  const { content } = message;
  const codeRegex =
    /```(typescript|tsx|html|css|go|javascript|java|python)(.*?)```/gs;

  let modifiedContent: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = codeRegex.exec(content)) !== null) {
    const codeBlock = match[2].trim();
    let language: Language = Language.javascript;
    switch (match[1] as Language) {
      case Language.typescript:
        language = Language.typescript;
        break;

      case Language.tsx:
        language = Language.tsx;
        break;

      case Language.html:
        language = Language.html;
        break;

      case Language.css:
        language = Language.css;
        break;

      case Language.go:
        language = Language.go;
        break;

      case Language.javascript:
        language = Language.javascript;
        break;

      case Language.java:
        language = Language.java;
        break;

      case Language.python:
        language = Language.python;
        break;

      default:
        language = Language.javascript; // Defina uma linguagem padrão
        break;
    }
    const codeBlockWithMode = (
      <AceEditor
        key={`ace-${lastIndex}`}
        placeholder="Placeholder Text"
        mode={language}
        theme="monokai"
        name="blah2"
        fontSize={14}
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
