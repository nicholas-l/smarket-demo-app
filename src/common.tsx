
/**
 * Returns a new string with the underscores changed to spaces and
 * captalised each word in string.
 * @param str string to change 
 */
export function removeUnderscoreAndCapitalise(str: string) {
  return str
    .split("_")
    .map(s => `${s[0].toUpperCase()}${s.slice(1)}`)
    .join(" ");
}