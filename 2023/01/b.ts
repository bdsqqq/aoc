// allow top level await
export {};

const input = Bun.file("./2023/01/input.txt");
const textInput = await input.text();

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const spelledOutDigits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]; // each digit is actually the position they're in this array because I wrote it in the right order heh
const spelledOutDigitAsNumber = (input: string) =>
  spelledOutDigits.findIndex((digit) => digit === input);

const allDigits = [...digits, ...spelledOutDigits];

const calibrationValues = textInput.split("\n").map((line) => {
  const splitLine = line.split("");

  let firstAcc = "";
  let first: string = "";
  for (let i = 0; i < splitLine.length; i++) {
    firstAcc = firstAcc + splitLine[i];
    const maybeMatch = allDigits.find((digit) => firstAcc.includes(digit));

    if (maybeMatch) {
      first = maybeMatch;
      break;
    }
  }

  let lastAcc = "";
  let last: string = "";
  for (let i = splitLine.length - 1; i >= 0; i--) {
    lastAcc = lastAcc + splitLine[i];
    const maybeMatch = allDigits.find((digit) =>
      lastAcc.split("").reverse().join("").includes(digit)
    );

    if (maybeMatch) {
      last = maybeMatch;
      break;
    }
  }

  if (spelledOutDigits.includes(first)) {
    first = spelledOutDigitAsNumber(first) + "";
  }

  if (spelledOutDigits.includes(last)) {
    last = spelledOutDigitAsNumber(last) + "";
  }

  return parseInt(first + last);
});

const totalCalibrationValue = calibrationValues.reduce(
  (prev, curr) => prev + curr
);

console.log(totalCalibrationValue);
