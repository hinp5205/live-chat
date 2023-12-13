function getTextStart(start: string): string {
  const startSplit = start.split(/<[^>]*>/g);
  return startSplit[startSplit.length - 1];
}

function getTextEnd(end: string): string {
  const endSplit = end.split(/<[^>]*>/g);
  return endSplit[0];
}

export function filterValueIntoElement(elm: Element, caretPosition: number) {
  const innerHTML = elm.innerHTML;

  const startHTMLFromCaret = innerHTML.slice(0, caretPosition);
  const endHTMLFromCaret = innerHTML.slice(caretPosition, innerHTML.length);

  return {
    caretPos: startHTMLFromCaret.length,
    value: getTextStart(startHTMLFromCaret) + getTextEnd(endHTMLFromCaret),
  };
}
