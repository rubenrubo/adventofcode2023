import { Run } from "./SolutionBase.js";
import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { GetNumberFromString } from "../Helpers/StringUtils.js";

function PartOne() {
  const lines = SplitOnNewLines("day2.txt");
  const capacity = {
    "red": 12,
    "green": 13,
    "blue": 14
  };
  let result = 0;
  lines.forEach((game, index) => {
    const sets = getSets(game);
    let gameIsPossible = true;
    sets.forEach((roll) => {
      if (!rollIsPossible(roll, capacity)) {
        gameIsPossible = false;
      }
    });
    if (gameIsPossible) {
      result += (index + 1);
    }
  })
  return result;
}

function PartTwo() {
  const lines = SplitOnNewLines("day2.txt");
  let result = 0;
  lines.forEach((game) => {
    let highestCubeAmount = {
      "red": 0,
      "green": 0,
      "blue": 0
    };
    const sets = getSets(game);
    sets.forEach((roll) => {
      const cubeAmount = determineCubeAmount(roll);
      if(cubeAmount.red > highestCubeAmount.red){
        highestCubeAmount.red = cubeAmount.red;
      }

      if(cubeAmount.green > highestCubeAmount.green){
        highestCubeAmount.green = cubeAmount.green;
      }

      if(cubeAmount.blue > highestCubeAmount.blue){
        highestCubeAmount.blue = cubeAmount.blue;
      }
    });
    result += (highestCubeAmount.red * highestCubeAmount.green * highestCubeAmount.blue)
  });
  return result;
}

function getSets(input) {
  const filterOutGame = input.split(":").pop();
  const sets = filterOutGame.split(";");
  return sets;
}

function rollIsPossible(roll, capacity) {
  const cubeAmount = determineCubeAmount(roll);
  if (cubeAmount.red > capacity.red ||
    cubeAmount.blue > capacity.blue ||
    cubeAmount.green > capacity.green) {
    return false;
  }
  return true;
}

function determineCubeAmount(roll) {
  const result = {
    "red": 0,
    "green": 0,
    "blue": 0
  };
  roll = roll.replace(/\s/g, '');
  const cubeColours = roll.split(",");
  cubeColours.forEach((c) => {
    const amount = GetNumberFromString(c);
    const colour = c.replace(amount.toString(), "");
    result[colour] += amount;
  });
  return result;
}

Run("Day 2 part one", "Cube Conundrum", PartOne);
Run("Day 2 part two", "Cube Conundrum", PartTwo);