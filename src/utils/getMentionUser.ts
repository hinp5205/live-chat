import { PositionMention } from '@appTypes/base';
import replace from 'lodash/replace';

export function getMentionUser(
  caretPosition: number,
  value: string, // text into 2 elements and caret into value
): null | PositionMention {
  if (!caretPosition || !value) return null;

  let newValue = '';
  let positionStart = -1;
  let positionEnd = -1;

  // get real value in front of caret
  const startValue = value.slice(0, caretPosition);
  const endValueLegacy = value.slice(caretPosition, value.length);
  const endValue = replace(endValueLegacy, new RegExp('&nbsp;', 'g'), ' ');
  const indexOfSpaceEndValue = endValue.indexOf(' ');

  // check end startValue have space
  if (startValue.endsWith(' ') || startValue.endsWith('@')) {
    return null;
  }

  if (indexOfSpaceEndValue === -1) {
    newValue = value;
  } else {
    newValue = startValue + endValue.slice(0, indexOfSpaceEndValue);
  }

  const newValueSplit = newValue
    .split(/<[^>]*>/g)
    .join('')
    .split(' ');

  const endMention = newValueSplit[newValueSplit.length - 1].replace(
    /<[^>]*>/g,
    '',
  );

  const checkMention = endMention.startsWith('@');
  if (!!checkMention) {
    positionStart = startValue.length - endMention.length;

    positionEnd = positionStart + endMention.length;

    return {
      positionEnd,
      positionStart,
      mention: endMention,
    };
  }
  return null;
}
