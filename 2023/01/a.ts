// allow top level await
export {};

const input = Bun.file("./2023/01/input.txt");
const textInput = await input.text();

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const totalCalibrationValue = textInput
  .split("\n")
  .map((line) =>
    parseInt(
      line.split("").find((char) => digits.includes(char)) +
        line.split("").findLast((char) => digits.includes(char))!
    )
  )
  .reduce((prev, curr) => prev + curr);

console.log(totalCalibrationValue);
