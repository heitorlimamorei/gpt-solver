export const regexPatterns = {
  boldRegex: /\*\*(.*?)\*\*|__(.*?)__/g,
  italicRegex: /\*(.*?)\*|_(.*?)_/g,
  strikethroughRegex: /~~(.*?)~~/g,
  linkRegex: /\[([^\]]+)\]\(([^)]+)\)/g,
  blockquoteRegex: /^>(.*)/gm,
  bulletListRegex: /^- (.*)/gm,
  numberedlistRegex: /^\d+\. (.*)/gm,
  h1Regex: /^# (.*)/gm,
  h2Regex: /^## (.*)/gm,
  h3Regex: /^### (.*)/gm,
  codeRegex: /```(typescript|tsx|jsx|html|css|go|javascript|java|python|bash||)(.*?)```/gs,
  pdfRegex: /```pdf(.*?)```/gs,
};
