export function getCaretPositionElement(target: HTMLDivElement) {
  if (target.isContentEditable) {
    const _range = document.getSelection().getRangeAt(0);
    if (!_range.collapsed) {
      return null;
    }
    const range = _range.cloneRange();
    const temp = document.createTextNode('\0');
    range.insertNode(temp);
    const caretposition = target.innerHTML.indexOf('\0');
    temp.parentNode.removeChild(temp);
    return caretposition;
  }
}
