import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { GetNumbersFromStringArray, ConvertStringNumbersFromStringArray } from "../Helpers/StringUtils.js";
import { Run } from "./SolutionBase.js";

function PartOne() {
  const lines = SplitOnNewLines("day1part1.txt");
  const numbers = GetNumbersFromStringArray(lines);
  let filteredNumbers = [];
  numbers.forEach((element) => {
    const first = ('' + element)[0];
    const last = element % 10;
    filteredNumbers.push(Number(first + last));
  });
  const sum = filteredNumbers.reduce((acc, a) => acc + a, 0);
  return sum;
}

function PartTwo() {
  const lines = SplitOnNewLines("day1part1.txt");
  const stringNumbersToNumbers = ConvertStringNumbersFromStringArray(lines);
  const numbers = GetNumbersFromStringArray(stringNumbersToNumbers);
  let filteredNumbers = [];
  numbers.forEach((element) => {
    const first = ('' + element)[0];
    const last = element % 10;
    filteredNumbers.push(Number(first + last));
  });
  const sum = filteredNumbers.reduce((acc, a) => acc + a, 0);
  return sum;
}

Run("Day 1 part one", "Trebuchet?!", PartOne);
Run("Day 1 part two", "Trebuchet?!", PartTwo);