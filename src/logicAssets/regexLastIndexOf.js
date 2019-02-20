export default function regexLastIndexOf(string, regex, startpos) {
  regex = regex.global
    ? regex
    : new RegExp(
        regex.source,
        "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : "")
      );
  if (typeof startpos == "undefined") {
    startpos = string.length;
  } else if (startpos < 0) {
    startpos = 0;
  }
  let stringToWorkWith = string.substring(0, startpos + 1);
  let lastIndexOf = -1;
  let nextStop = 0;
  let result;
  while ((result = regex.exec(stringToWorkWith)) != null) {
    lastIndexOf = result.index;
    regex.lastIndex = ++nextStop;
  }
  return lastIndexOf;
}
