import React from 'react';

import { IMessage } from '@/components/chat/Chat';

import CodeBlock from '../components/chat/CodeBlock';
import FormattedText from '../components/chat/FormattedText';
import { getLanguage } from '../utils/getLanguage';
import { regexPatterns } from '../utils/regexPatterns';

export function useFormat(message: IMessage): React.ReactNode[] {
  let { content } = message;

  const { codeRegex, pdfRegex } = regexPatterns;
  let modifiedContent: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  content = content.replace(pdfRegex, '');
  while ((match = codeRegex.exec(content)) !== null) {
    const codeBlock = match[2].trim();
    const language = getLanguage(match);

    if (lastIndex !== match.index) {
      modifiedContent = modifiedContent.concat(
        <FormattedText content={content.substring(lastIndex, match.index)} />,
      );
    }

    modifiedContent.push(<CodeBlock codeBlock={codeBlock} language={language} />);

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const remainingContent = content.substring(lastIndex);
    modifiedContent = modifiedContent.concat(<FormattedText content={remainingContent} />);
  }

  return modifiedContent;
}
