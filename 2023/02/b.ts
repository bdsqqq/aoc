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

const gamesWithMinColors = games.map((game) => ({
  id: game.id,
  minColors: {
    red: game.turns.reduce((prev, turn) => Math.max(prev, turn.red), 0),
    green: game.turns.reduce((prev, turn) => Math.max(prev, turn.green), 0),
    blue: game.turns.reduce((prev, turn) => Math.max(prev, turn.blue), 0),
  },
}));

const gamePowers = gamesWithMinColors.map((game) => ({
  id: game.id,
  power: game.minColors.red * game.minColors.green * game.minColors.blue,
}));

const totalPowers = gamePowers.reduce((prev, { power }) => prev + power, 0);

console.log(totalPowers);
