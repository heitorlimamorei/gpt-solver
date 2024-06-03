import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';

interface CodeBlockProps {
  codeBlock: string;
  language: string;
}

export default function CodeBlock({ codeBlock, language }: CodeBlockProps) {
  const numberOfLines = codeBlock.split('\n').length;
  const style = {
    position: 'relative',
    zIndex: 0,
  };

  return (
    <div className="w-full">
      <AceEditor
        width="100%"
        height={`calc(20px * ${numberOfLines} + 40px)`}
        placeholder="Placeholder Text"
        mode={language}
        theme="monokai"
        name="code-editor"
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
        style={{ zIndex: 0 }}
      />
    </div>
  );
}
