// allow top level await
export {};

const input = Bun.file("./2023/02/input.txt");
const textInput = await input.text();

const maxColors = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = textInput
  .trim()
  .split("\n")
  .map((game) => ({
    id: parseInt(game.split(":")[0].replace("Game", "").trim()),
    turns: game
      .split(":")[1]
      .split("; ") // split game into turns
      .map((turn) => turn.split(", ")) // split turn into color grabs
      .map((colorGrab) => ({
        red: parseInt(
          colorGrab
            .find((p) => p.includes("red")) // determine if red draw
            ?.replace("red", "") ?? "0" // leave only the number in the string. Default to 0
        ),
        green: parseInt(
          colorGrab
            .find((p) => p.includes("green")) // determine if green draw
            ?.replace("green", "") ?? "0" // leave only the number in the string. Default to 0
        ),
        blue: parseInt(
          colorGrab
            .find((p) => p.includes("blue")) // determine if blue draw
            ?.replace("blue", "") ?? "0" // leave only the number in the string. Default to 0
        ),
      })),
  }));

const validGames = games.filter(
  (game) =>
    !game.turns.some(
      (turn) =>
        turn.red > maxColors.red ||
        turn.green > maxColors.green ||
        turn.blue > maxColors.blue
    )
);

const sumOfIdsOfValidGames = validGames.reduce(
  (prev, currGame) => prev + currGame.id,
  0
);

console.log(sumOfIdsOfValidGames);
