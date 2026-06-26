import React from "react";
import Hint from "./Hint";

/**
 * Splits text and replaces glossary terms with <Hint> components.
 * Longer terms are matched first to avoid partial matches.
 */
export function parseWithHints(
  text: string,
  glossary: Record<string, string>
): React.ReactNode[] {
  if (!glossary || Object.keys(glossary).length === 0) return [text];

  // Sort by term length descending so "C4-Diagramm" matches before "C4"
  const terms = Object.keys(glossary).sort((a, b) => b.length - a.length);
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");

  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (glossary[part]) {
      return <Hint key={i} term={part} explanation={glossary[part]} />;
    }
    return part;
  });
}
