"use client";

import { useEffect, useRef } from "react";
import { createEditorView } from "./CodemirrorConfig";

export function TextFileClient({
  content,
  fileExtension,
}: {
  content: string;
  fileExtension?: string | null;
}) {
  const codemirrorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!codemirrorRef.current) {
      return;
    }

    const editorView = createEditorView({
      parent: codemirrorRef.current,
      doc: content,
      fileExtension,
    });

    return () => {
      editorView.destroy();
    };
  }, [codemirrorRef, content, fileExtension]);

  return <div ref={codemirrorRef} />;
}
