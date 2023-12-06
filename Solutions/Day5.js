import { Run } from "./SolutionBase.js";
import { GetRawInput } from "../Helpers/FileReader.js";

function PartOne() {
  const input = GetRawInput("day5.txt").split("\n");
  input.pop()

  const map = GetMap(input);
  const seeds = input[0].replace("seeds: ", "").split(" ").map(Number);
  const result = [];

  seeds.forEach(seed => {
    result.push(lookUp(seed, map));
  });
  return Math.min(...result);
}

function PartTwo() {
  const input = GetRawInput("day5.txt").split("\n");
  input.pop()

  const map = GetMap(input);
  const seedsInput = input[0].replace("seeds: ", "").split(" ").map(Number);
  let seeds = [];
  let multipliers = [];
  for (let i = 0; i < seedsInput.length; i++) {
    if (i % 2) {
      multipliers.push(seedsInput[i]);
      continue;
    }
    seeds.push(seedsInput[i]);
  }

  let answer = 0;
  for(let i = 0; i < 1000000000; i++){
    const result = lookUpReverse(i, map);
    if(resultIncludesSeed(result, seeds, multipliers)){
      answer = i;
      break;
    }
  }
  return answer;
}

function resultIncludesSeed(result, seeds, multipliers){
  for(let i = 0; i < seeds.length; i ++){
    if(result >= seeds[i] && result < seeds[i] + multipliers[i]){
      return true;
    }
  }
  return false;
}

function lookUpReverse(seed, maps) {
  let seedPosition = seed;

  for (let i = maps.length - 1; i >= 0; i--) {
    for (let item of maps[i]) {
      const [destRange, sourceRange, range] = item;
      if (seedPosition >= destRange && seedPosition <= (destRange + range - 1)) {
        seedPosition = sourceRange + (seedPosition - destRange);
        break;
      }
    }
  }
  return seedPosition;
}

function lookUp(seed, maps) {
  let seedPosition = seed;

  for (let i = 0; i < maps.length; i++) {
    for (let item of maps[i]) {
      const [destRange, sourceRange, range] = item;
      if (seedPosition >= sourceRange && seedPosition <= (sourceRange + range - 1)) {
        seedPosition = destRange + (seedPosition - sourceRange);
        break;
      }
    }
  }
  return seedPosition;
}

function GetMap(input) {
  const splits = [
    input.indexOf("seed-to-soil map:"),
    input.indexOf("soil-to-fertilizer map:"),
    input.indexOf("fertilizer-to-water map:"),
    input.indexOf("water-to-light map:"),
    input.indexOf("light-to-temperature map:"),
    input.indexOf("temperature-to-humidity map:"),
    input.indexOf("humidity-to-location map:"),
    input.length + 1
  ]

  const map = []

  for (let i = 0; i < splits.length - 1; i++) {
    const firstIndex = splits[i];
    const secondIndex = splits[i + 1] - 1;

    const lines = input.slice(firstIndex + 1, secondIndex);
    const split = [];

    for (const line of lines) {
      split.push(line.split(" ").map(Number));
    }
    map.push(split);
  }
  return map;
}

Run("Day 5 part one", "If You Give A Seed A Fertilizer", PartOne);
Run("Day 5 part two", "If You Give A Seed A Fertilizer", PartTwo);