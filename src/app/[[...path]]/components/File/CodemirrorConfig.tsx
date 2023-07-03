import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import {
  LanguageSupport,
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { EditorState, type Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  EditorView,
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view";

// (The superfluous function calls around the list of extensions work
// around current limitations in tree-shaking software.)

const basicSetup: Extension = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
])();

type Languages =
  | "js"
  | "jsx"
  | "ts"
  | "tsx"
  | "html"
  | "css"
  | "scss"
  | "md"
  | "markdown"
  | (string & {});

type LanguageParser = () => LanguageSupport;

const languages = new Map<Languages, LanguageParser>([
  ["js", javascript],
  ["jsx", javascript],
  ["ts", javascript],
  ["tsx", javascript],
  ["html", html],
  ["css", css],
  ["scss", css],
  ["md", markdown],
  ["markdown", markdown],
]);

const baseTheme = EditorView.baseTheme({
  "&": {
    borderRadius: "16px",
    overflow: "hidden",
    padding: "0.5rem",
    paddingBottom: "0",
  },
});

export function createEditorView({
  parent,
  doc,
  fileExtension,
}: {
  parent: HTMLElement;
  doc: string;
  fileExtension?: string | null;
}) {
  const extensions: (Extension | LanguageSupport)[] = [
    basicSetup,
    oneDark,
    baseTheme,
  ];

  if (fileExtension) {
    const parser = languages.get(fileExtension);

    if (parser) {
      extensions.push(parser());
    }
  }

  const view = new EditorView({
    extensions,
    parent,
    doc,
  });

  return view;
}
