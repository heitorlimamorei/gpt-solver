import React from 'react';

import { uniqueId } from 'lodash';

import { regexPatterns } from '../../utils/regexPatterns';

interface FormattedTextProps {
  content: string;
}

export default function FormattedText({ content }: FormattedTextProps) {
  const {
    boldRegex,
    italicRegex,
    strikethroughRegex,
    linkRegex,
    blockquoteRegex,
    bulletListRegex,
    numberedlistRegex,
    h1Regex,
    h2Regex,
    h3Regex,
  } = regexPatterns;

  const elements: React.ReactNode[] = [];

  content.split('\n').forEach((line) => {
    if (boldRegex.test(line)) {
      line = line.replace(boldRegex, '<strong>$1$2</strong>');
    }
    if (italicRegex.test(line)) {
      line = line.replace(italicRegex, '<em>$1$2</em>');
    }
    if (strikethroughRegex.test(line)) {
      line = line.replace(strikethroughRegex, '<del>$1</del>');
    }
    if (linkRegex.test(line)) {
      line = line.replace(linkRegex, '<a href="$2">$1</a>');
    }
    if (blockquoteRegex.test(line)) {
      line = line.replace(blockquoteRegex, '<blockquote>$1</blockquote>');
    }
    if (bulletListRegex.test(line)) {
      line = line.replace(bulletListRegex, '<li>$1</li>');
      line = `<ul>${line}</ul>`;
    }
    if (numberedlistRegex.test(line)) {
      line = line.replace(numberedlistRegex, '<li>$1</li>');
      line = `<ol>${line}</ol>`;
    }
    if (h1Regex.test(line)) {
      line = line.replace(h1Regex, '<h1>$1</h1>');
    }
    if (h2Regex.test(line)) {
      line = line.replace(h2Regex, '<h2>$1</h2>');
    }
    if (h3Regex.test(line)) {
      line = line.replace(h3Regex, '<h3>$1</h3>');
    }

    elements.push(<div dangerouslySetInnerHTML={{ __html: line }} />);
  });

  return elements.map((element) => <React.Fragment key={uniqueId()}>{element}</React.Fragment>);
}
