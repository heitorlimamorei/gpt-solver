import { Language } from './LanguageEnum';

export function getLanguage(match: RegExpMatchArray): Language {
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
