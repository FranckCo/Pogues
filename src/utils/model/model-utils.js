/**
 * Contains comment
 *
 * Verify if exist a comment parsed in a string. In case it exists, the comment is returned.
 *
 * @param  {string}   str   String
 * @return {false|string} false if the comment is not present or the comment itself
 */
export function containsComment(str) {
  const regExpCmt = /##([^\n]*)/;
  return str.match(regExpCmt);
}

export function getQuestionLabelFromRaw(rawQuestionLabel) {
  // @TODO: Markdow is not parsed yed. Include this feature.
  let label = rawQuestionLabel;
  const regex = /^(##{.*})?(.*)$/;
  const regExpCmt = RegExp(regex);
  if (regExpCmt.test(rawQuestionLabel)) {
    const matches = rawQuestionLabel.match(regex);
    label = matches[2].trim();
  }

  return label;
}
