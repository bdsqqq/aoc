// allow top level await
export {};

const input = Bun.file("./2023/01/input.txt");
const textInput = await input.text();

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const calibrationValues = textInput.split("\n").map((line) => {
  const chars = line.split("");

  const first = chars.find((char) => digits.includes(char)) + "";
  const last = chars.findLast((char) => digits.includes(char)) + "";

  return parseInt(first + last);
});

const totalCalibrationValue = calibrationValues.reduce(
  (prev, curr) => prev + curr
);

console.log(totalCalibrationValue);
