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

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line
} from 'recharts';

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

function generateCodeBlockWithMode(codeBlock: string, language: Language): React.ReactNode {
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

function generateTextContent(content: string): React.ReactNode {
  const boldRegex = /\*\*(.*?)\*\*|__(.*?)__/g;
  const italicRegex = /\*(.*?)\*|_(.*?)_/g;
  const strikethroughRegex = /~~(.*?)~~/g;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const blockquoteRegex = /^>(.*)/gm;
  const bulletListRegex = /^- (.*)/gm;
  const numberedlistRegex = /^\d+\. (.*)/gm;
  const h1Regex = /^# (.*)/gm;
  const h2Regex = /^## (.*)/gm;
  const h3Regex = /^### (.*)/gm;

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

  return elements;
}

interface PieChartComponentProps {
  data: ChartData[];
}

interface BarChartComponentProps {
  data: ChartData[];
}

interface LineChartComponentProps {
  data: ChartData[];
}

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export function useFormat(message: IMessage): React.ReactNode[] {
  let { content } = message;

  if (message.role == 'assistant' && content.includes('chartjson')) {
    let components: React.ReactNode[] = [];

    const i = content.split('').findIndex((c) => c == '{');
    const lastI = content.split('').findLastIndex((c) => c == '}');

    if (lastI < 3) {
      return components;
    }

    const jsonstring = content.substring(i, lastI + 1);

    let json = JSON.parse(jsonstring);

    const obj = Object.keys(json);

    const chartData: ChartData[] = obj.map((key: string) => {
      return {
        name: key,
        value: json[key],
      };
    });

    if (content.split('-').slice(0, 3).includes('pizza')) {
      components.push(<PieChartComponent data={chartData} />);
    }

    if (content.split('-').slice(0, 3).includes('barras')) {
      components.push(<BarChartComponent data={chartData} />);
    }

    if (content.split('-').slice(0, 3).includes('linha')) {
      components.push(<LineChartComponent data={chartData} />);
    }

    return components;
  }

  const codeRegex = /```(typescript|tsx|jsx|html|css|go|javascript|java|python|bash||)(.*?)```/gs;
  const pdfRegex = /```pdf(.*?)```/gs;

  let modifiedContent: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  content = content.replace(pdfRegex, '');
  while ((match = codeRegex.exec(content)) !== null) {
    const codeBlock = match[2].trim();
    const language = getLanguage(match);

    if (lastIndex !== match.index) {
      modifiedContent = modifiedContent.concat(
        generateTextContent(content.substring(lastIndex, match.index)),
      );
    }

    modifiedContent.push(generateCodeBlockWithMode(codeBlock, language));

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const remainingContent = content.substring(lastIndex);
    modifiedContent = modifiedContent.concat(generateTextContent(remainingContent));
  }

  return modifiedContent;
}
