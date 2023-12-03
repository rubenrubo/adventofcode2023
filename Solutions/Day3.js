import { Run } from "./SolutionBase.js";
import { CreateMap } from "../Helpers/FileReader.js";
import { CharIsNumber } from "../Helpers/StringUtils.js";

function PartOne() {
  const map = CreateMap("day3.txt");
  const symbols = ['#', '$', '%', '&', '*', '+', '-', '/', '@', '='];
  let sum = 0;

  for (let y = 0; y < map[0].length; y++) {
    let number = "";
    let symbolAdjacent = false;
    for (let x = 0; x < map.length; x++) {
      if (CharIsNumber(map[y][x])) {
        number += map[y][x];
        if (SymbolIsAdjacent({ x: x, y: y }, map, symbols)) {
          symbolAdjacent = true;
        }
      }
      if (!map[y][x + 1] || !CharIsNumber(map[y][x + 1])) {
        if (symbolAdjacent) {
          sum += Number(number);
        }
        number = "";
        symbolAdjacent = false;
      }
    }
  }
  return sum;
}

function PartTwo() {
  const map = CreateMap("day3.txt");
  const symbols = ['*'];
  let numberSymbolCoordinates = [];
  let sum = 0;

  for (let y = 0; y < map[0].length; y++) {
    let number = "";
    let symbolAdjacent = undefined;
    for (let x = 0; x < map.length; x++) {
      if (CharIsNumber(map[y][x])) {
        number += map[y][x];
        const adjacent = SymbolIsAdjacent({ x: x, y: y }, map, symbols);
        if (adjacent) {
          symbolAdjacent = adjacent;
        }
      }
      if (!map[y][x + 1] || !CharIsNumber(map[y][x + 1])) {
        if (symbolAdjacent) {
          const existingNumberToSymbolAdjacent = numberSymbolCoordinates.find(x => x.symbolAdjacent.x == symbolAdjacent.x && x.symbolAdjacent.y == symbolAdjacent.y);
          if(existingNumberToSymbolAdjacent){
            sum += (existingNumberToSymbolAdjacent.value * Number(number));
          }
          numberSymbolCoordinates.push({ symbolAdjacent, value: Number(number) });
        }
        number = "";
        symbolAdjacent = undefined;
      }
    }
  }
  return sum;
}

function SymbolIsAdjacent(cP, map, symbols) {
  if (map[cP.y][cP.x + 1] && symbols.includes(map[cP.y][cP.x + 1])) {
    return { x: cP.x + 1, y: cP.y };
  }

  if (map[cP.y][cP.x - 1] && symbols.includes(map[cP.y][cP.x - 1])) {
    return { x: cP.x - 1, y: cP.y };
  }

  if (map[cP.y + 1] && symbols.includes(map[cP.y + 1][cP.x])) {
    return { x: cP.x, y: cP.y + 1 };
  }

  if (map[cP.y - 1] && symbols.includes(map[cP.y - 1][cP.x])) {
    return { x: cP.x, y: cP.y - 1 };
  }

  if (map[cP.y - 1] && map[cP.y - 1][cP.x + 1] && symbols.includes(map[cP.y - 1][cP.x + 1])) {
    return { x: cP.x + 1, y: cP.y - 1 };
  }

  if (map[cP.y - 1] && map[cP.y - 1][cP.x - 1] && symbols.includes(map[cP.y - 1][cP.x - 1])) {
    return { x: cP.x - 1, y: cP.y - 1 };
  }

  if (map[cP.y + 1] && map[cP.y + 1][cP.x + 1] && symbols.includes(map[cP.y + 1][cP.x + 1])) {
    return { x: cP.x + 1, y: cP.y + 1 };
  }

  if (map[cP.y + 1] && map[cP.y + 1][cP.x - 1] && symbols.includes(map[cP.y + 1][cP.x - 1])) {
    return { x: cP.x - 1, y: cP.y + 1 };
  }
}

Run("Day 3 part one", "Gear Ratios", PartOne);
Run("Day 3 part two", "Gear Ratios", PartTwo);