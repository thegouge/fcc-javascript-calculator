export function toSeconds(inputString) {
  const letterMatch = inputString.match(/\d{1,}[hms]/g);

  const seconds = letterMatch
    .map((timePartial) => {
      const partialEnd = timePartial.length - 1;
      const number = parseInt(timePartial.substring(0, partialEnd));
      switch (timePartial[partialEnd]) {
        case "h":
          return number * 3600;

        case "m":
          return number * 60;

        case "s":
          return number;

        default:
          return 0;
      }
    })
    .reduce((acc, curr) => acc + curr, 0);

  return seconds;
}

export function toMinutes(seconds) {
  return `${seconds / 60}m`;
}

export function toHours(seconds) {
  return `${seconds / 3600}h`;
}

export function notate(inputSeconds) {
  let seconds = inputSeconds;
  let hours = 0;
  let minutes = 0;

  while (seconds >= 60) {
    seconds -= 60;
    minutes++;
  }

  while (minutes >= 60) {
    minutes -= 60;
    hours++;
  }

  var result = `${hours}h${minutes}m${seconds}s`;
  return result;
}
