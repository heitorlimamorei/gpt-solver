import React from 'react';

import { uniqueId } from 'lodash';

import BarChartComponent from '@/components/charts/BarChartComponent';
import LineChartComponent from '@/components/charts/LineChartComponent';
import PieChartComponent from '@/components/charts/PieChartComponent';
import { IMessage } from '@/components/chat/Chat';

import CodeBlock from '../components/chat/CodeBlock';
import FormattedText from '../components/chat/FormattedText';
import { getLanguage } from '../utils/getLanguage';
import { regexPatterns } from '../utils/regexPatterns';
import { formatLineChartData } from '@/utils/formatLineChartData';

export function useFormat(message: IMessage): React.ReactNode[] {
  let { content } = message;
  if (message.role == 'system') {
    return [];
  }

  const { codeRegex, pdfRegex, chartJsonRegex } = regexPatterns;
  let modifiedContent: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  content = content.replace(pdfRegex, '');

  while ((match = chartJsonRegex.exec(content)) !== null) {
    const chartJsonContent = JSON.parse(match[1].trim());

    const chartType = chartJsonContent.type;
    const chartData = chartJsonContent.data;

    if (lastIndex !== match.index) {
      modifiedContent = modifiedContent.concat(
        <FormattedText key={uniqueId()} content={content.substring(lastIndex, match.index)} />,
      );
    }
    if (chartType == 'barras') {
      modifiedContent.push(<BarChartComponent data={chartData} />);
    } else if (chartType == 'pizza') {
      modifiedContent.push(<PieChartComponent data={chartData} />);
    } else if (chartType == 'linha') {
      <LineChartComponent data={chartData} />;
    }

    lastIndex = match.index + match[0].length;
  }

  content = content.substring(lastIndex);
  lastIndex = 0;

  while ((match = codeRegex.exec(content)) !== null) {
    const codeBlock = match[2].trim();
    const language = getLanguage(match);

    if (lastIndex !== match.index) {
      modifiedContent = modifiedContent.concat(
        <FormattedText key={uniqueId()} content={content.substring(lastIndex, match.index)} />,
      );
    }

    modifiedContent.push(<CodeBlock codeBlock={codeBlock} language={language} />);

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const remainingContent = content.substring(lastIndex);
    modifiedContent = modifiedContent.concat(
      <FormattedText key={uniqueId()} content={remainingContent} />,
    );
  }

  return modifiedContent;
}
