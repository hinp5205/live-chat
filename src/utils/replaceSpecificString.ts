export function replaceSpecificString(
  value: string,
  positionStart: number,
  positionEnd: number,
  valueReplace: string,
) {
  return (
    value.substring(0, positionStart) +
    valueReplace +
    value.substring(positionEnd, value.length)
  );
}
