import { GetRawInput } from "../Helpers/FileReader.js";
import { Run } from "./SolutionBase.js";


function PartOne() {
  const input = GetRawInput("day8.txt");
  const steps = input.split(/\n\s*\n/).shift();
  const locations = input.split(/\n\s*\n/).pop().split(/\r?\n/);
  const destination = "ZZZ";

  const tree = CreateNodeTree(locations);

  let currentPosition = "AAA";

  let stepsTaken = 0;
  while (currentPosition != destination) {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] == "L") {
        currentPosition = tree[currentPosition].left;
      }

      if (steps[i] == "R") {
        currentPosition = tree[currentPosition].right;
      }

      stepsTaken++;
      if (currentPosition == destination) {
        return stepsTaken;
      }
    }
  }
  return stepsTaken;
}

function PartTwo() {
  const input = GetRawInput("day8.txt");
  const steps = input.split(/\n\s*\n/).shift();
  const locations = input.split(/\n\s*\n/).pop().split(/\r?\n/);
  const tree = CreateNodeTree(locations);

  let currentPositions = Object.keys(tree).filter(key => key[key.length - 1] == 'A');
  const result = [];
  for (let y = 0; y < currentPositions.length; y++) {
    let stepsTaken = 0;
    let notFound = true;
    while (notFound) {
      for (let i = 0; i < steps.length; i++) {
        if (steps[i] == "L") {
          currentPositions[y] = tree[currentPositions[y]].left;
        }

        if (steps[i] == "R") {
          currentPositions[y] = tree[currentPositions[y]].right;
        }
        stepsTaken++;

        if (currentPositions[y][currentPositions[y].length - 1] == 'Z') {
          result.push(stepsTaken);
          notFound = false;
          break;
        }
      }
    }
  }
  return leastCommonMultiple(result);
}

function leastCommonMultiple(input) {
  function gcd(a, b) {
      return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
      return (a * b) / gcd(a, b);   
  }

  var multiple = input[0];
  input.forEach(function(n) {
      multiple = lcm(multiple, n);
  });

  return multiple;
}

function CreateNodeTree(locations) {
  const map = {};
  for (let i = 0; i < locations.length; i++) {
    const nodeName = locations[i].split('=').shift().trim();
    const left = locations[i].split('=').pop().trim().split(",")[0].replace('(', '');
    const right = locations[i].split('=').pop().trim().split(",")[1].trim().replace(')', '');
    map[nodeName] = {
      left: left,
      right: right
    }
  }
  return map;
}

Run("Day 8 part one", "Haunted Wasteland", PartOne);
Run("Day 8 part two", "Haunted Wasteland", PartTwo);