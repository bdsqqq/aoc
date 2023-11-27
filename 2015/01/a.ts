// allow top level await
export {};

const input = Bun.file("./2015/01/input.txt");
const textInput = await input.text();

const startFloor = 0;
const up = "(";
const down = ")";

const upAmount = 1;
const moveUp = (prev: number) => prev + upAmount;

const downAmount = 1;
const moveDown = (prev: number) => prev - downAmount;

const splitInput = textInput.split("");

const finalFloor = splitInput.reduce((floor, move, i) => {
  if (move === up) return moveUp(floor);
  if (move === down) return moveDown(floor);

  throw new Error(
    `Move ${move} at index ${i} isn't a valid option. Valid options are: ${[
      up,
      down,
    ]}`
  );
}, startFloor);

console.log(finalFloor);
