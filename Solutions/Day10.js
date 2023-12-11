import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { Run } from "./SolutionBase.js";

// to solve part two for your input replace this char with the pipe S represents
let startChar = '|'

function PartOne() {
  const tree = Solve();
  let result = 0;
  for (const [key, value] of Object.entries(tree)) {
    if (value.steps > result) {
      result = value.steps;
    }
  }
  return result;
}

function PartTwo() {
  const tree = Solve(true);
  const map = SplitOnNewLines("day10.txt").map(line => line.split(""));
  const outerXIndex = map[0].length - 1;
  const outerYIndex = map.length -1;
  let result = 0;
  for (const [key, value] of Object.entries(tree)) {
    if (!value.visited) {
      if (pointIsInsideLoop(key, tree, outerXIndex, outerYIndex)){
        result++;
      }
    }
  }
  return result;
}

function Solve(partTwo) {
  const map = SplitOnNewLines("day10.txt").map(line => line.split(""));
  const tree = CreateNodeTree(map, partTwo);
  map.forEach((line, y) => {
    line.forEach((tile, x) => {
      if (tile == 'S') {
        const rightConnected = IsConnectedToStart(`${y},${x}`, y, x + 1, tree);
        const leftConnected = IsConnectedToStart(`${y},${x}`, y, x - 1, tree);
        const downConnected = IsConnectedToStart(`${y},${x}`, y + 1, x, tree);
        const upConnected = IsConnectedToStart(`${y},${x}`, y - 1, x, tree);

        if (rightConnected) {
          WalkPath(`${y},${x}`, `${y},${x + 1}`, tree);
        }
        if (leftConnected) {
          WalkPath(`${y},${x}`, `${y},${x - 1}`, tree);
        }
        if (downConnected) {
          WalkPath(`${y},${x}`, `${y + 1},${x}`, tree);
        }
        if (upConnected) {
          WalkPath(`${y},${x}`, `${y - 1},${x}`, tree);
        }
      }
    });
  });
  return tree;
}

function WalkPath(start, location, tree) {
  let steps = 1;
  let curPos = location;
  let prevPos = start;
  while (true) {
    if (curPos == start) {
      return;
    }

    tree[curPos].visited = true;

    if (steps < tree[curPos].steps || tree[curPos].steps == 0) {
      tree[curPos].steps = steps;
    }

    if (tree[curPos].pointA != curPos && tree[curPos].pointA != prevPos) {
      prevPos = curPos;
      curPos = tree[curPos].pointA;
    }
    else if (tree[curPos].pointB != curPos && tree[curPos].pointB != prevPos) {
      prevPos = curPos;
      curPos = tree[curPos].pointB;
    }
    steps++;
  }
}

// solving part 2 using point "in polygon algorithm"
// even amount of wall crossings means point is out of loop
// odd amount of wall crossings means point is within loop
// outer index is the index of the maximum x value. This is an edge case
function pointIsInsideLoop(point, tree, outerXIndex, outerYIndex) {
  let y = point.split(',').shift();
  let x = point.split(',').pop();
  let intersections = 0;
  if(x == 0 || y == 0 || x == outerXIndex || y == outerYIndex) return false;

  for(let i = (x - 1); i >= 0; i--){
    let intersection = tree[`${y},${i}`];
    if(!intersection) continue;
    if(intersection.visited && (intersection.value == 'J' || intersection.value == 'L' || intersection.value == '|')){
      intersections++;
    }
  }

  return !(intersections % 2 == 0);
}

function CreateNodeTree(map, partTwo) {
  let result = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      let tile = map[y][x];
      if (tile == 'F') {
        result[`${y},${x}`] = CreatePoint(y + 1, x, y, x + 1, 'F');
      }
      else if (tile == '7') {
        result[`${y},${x}`] = CreatePoint(y + 1, x, y, x - 1, '7');
      }
      else if (tile == 'J') {
        result[`${y},${x}`] = CreatePoint(y - 1, x, y, x - 1, 'J');
      }
      else if (tile == '|') {
        result[`${y},${x}`] = CreatePoint(y - 1, x, y + 1, x, '|');
      }
      else if (tile == 'L') {
        result[`${y},${x}`] = CreatePoint(y - 1, x, y, x + 1, 'L');
      }
      else if (tile == '-') {
        result[`${y},${x}`] = CreatePoint(y, x - 1, y, x + 1, '-');
      }
      else if (tile == '.') {
        result[`${y},${x}`] = { visited: false, value: '.' };
      }
      else if(partTwo && tile == 'S'){
        result[`${y},${x}`] = CreatePoint(y - 1, x, y + 1, x, startChar);
        result[`${y},${x}`].visited = true;
      }
    }
  }
  return result;
}

function IsConnectedToStart(start, y, x, tree) {
  let connectedPiece = tree[`${y},${x + 1}`];
  if (connectedPiece && connectedPiece.value != '.') {
    const pointAY = connectedPiece.pointA.split(",").unshift();
    const pointAX = connectedPiece.pointA.split(",").pop();
    const pointBY = connectedPiece.pointA.split(",").unshift();
    const pointBX = connectedPiece.pointA.split(",").pop();
    const startY = start.split(",").unshift();
    const startX = start.split(",").pop();
    if (startY == pointAY || startY == pointBY || startX == pointAX || startX == pointBX) {
      return true;
    }
  }
  return false;
}

function CreatePoint(y, x, y1, x1, value) {
  return { pointA: `${y},${x}`, pointB: `${y1},${x1}`, steps: 0, visited: false, value };
}

Run("Day 10 part one", "Pipe Maze", PartOne);
Run("Day 10 part two", "Pipe Maze", PartTwo);