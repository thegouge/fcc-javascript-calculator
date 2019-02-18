export function toSeconds(inputString) {
  let hours, minutes, seconds;
  const letterMatch = inputString.match(/[hms]/g);
  const newString = inputString.split(/[hms]/g);
  newString.splice(-1, 1);

  for (var i = 0; i < letterMatch.length; i++) {
    if (letterMatch[i] === "h") {
      hours = newString[i];
    } else if (letterMatch[i] === "m") {
      minutes = newString[i];
    } else if (letterMatch[i] === "s") {
      seconds = newString[i];
    }
  }

  minutes = parseInt(minutes) + hours * 60;
  seconds = parseInt(seconds) + minutes * 60;

  return `${seconds}`;
}

export function toMinutes(inputString) {
  return `inputString`;
}

export function toHours(inputString) {
  return `inputString`;
}

export function notate(inputString) {
  let seconds = toSeconds(inputString);
  let hours = 0;
  let minutes = 0;

  while (seconds > 60) {
    seconds -= 60;
    minutes++;
  }

  while (minutes > 60) {
    minutes -= 60;
    hours++;
  }

  var result = `${hours}h${minutes}m${seconds}s`;
  return result;
}
