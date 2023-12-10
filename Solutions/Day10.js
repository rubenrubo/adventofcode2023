import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { Run } from "./SolutionBase.js";

function PartOne() {
  const map = SplitOnNewLines("day10.txt").map(line => line.split(""));
  const tree = CreateNodeTree(map);

  // 6727 too low
  map.forEach((line, y) => {
    line.forEach((tile, x) => {
      if(tile == 'S'){
        const rightConnected = IsConnectedToStart(`${y},${x}`, y, x+1, tree);
        const leftConnected = IsConnectedToStart(`${y},${x}`, y, x-1, tree);
        const downConnected = IsConnectedToStart(`${y},${x}`, y+1, x, tree);;
        const upConnected = IsConnectedToStart(`${y},${x}`, y-1, x, tree);
        if(rightConnected){
          WalkPath(`${y},${x}`, `${y},${x+1}`, tree);
        }
        if(leftConnected){
          WalkPath(`${y},${x}`, `${y},${x-1}`, tree);
        }
        if(downConnected){
          WalkPath(`${y},${x}`, `${y+1},${x}`, tree);
        }
        if(upConnected){
          WalkPath(`${y},${x}` , `${y-1},${x}`, tree);
        }
      }
    });
  });

  let result = 0;
  for (const [key, value] of Object.entries(tree)) {
    if(value.steps > result){
      result = value.steps;
    }
  }
  return result;
}

function WalkPath(start, location, tree){
  let steps = 1;
  let curPos = location;
  let prevPos = start;
  while(true){
    if(!tree[curPos]){
      return;
    }

    if(steps < tree[curPos].steps || tree[curPos].steps == 0){
      tree[curPos].steps = steps;
    } 

    if(tree[curPos].pointA != curPos && tree[curPos].pointA != prevPos){
      prevPos = curPos;
      curPos = tree[curPos].pointA;
    }
    else if(tree[curPos].pointB != curPos && tree[curPos].pointB != prevPos){
      prevPos = curPos;
      curPos = tree[curPos].pointB;
    }
    steps++;
  }
}

function CreateNodeTree(map) {
  let result = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      let tile = map[y][x];
      if (tile == 'F') {
        result[`${y},${x}`] = CreatePoint(y+1,x,y,x+1);
      }
      else if (tile == '7') {
        result[`${y},${x}`] = CreatePoint(y+1,x,y,x-1);
      }
      else if (tile == 'J') {
        result[`${y},${x}`] = CreatePoint(y-1,x,y,x-1);
      }
      else if (tile == '|') {
        result[`${y},${x}`] = CreatePoint(y-1,x,y+1,x);
      }
      else if (tile == 'L') {
        result[`${y},${x}`] = CreatePoint(y-1,x,y,x+1);
      }
      else if (tile == '-') {
        result[`${y},${x}`] = CreatePoint(y,x-1,y,x+1);
      }
    }
  }
  return result;
}

function IsConnectedToStart(start, y, x, tree){
  let connectedPiece = tree[`${y},${x+1}`];
  if(connectedPiece){
    const pointAY = connectedPiece.pointA.split(",").unshift();
    const pointAX = connectedPiece.pointA.split(",").pop();
    const pointBY = connectedPiece.pointA.split(",").unshift();
    const pointBX = connectedPiece.pointA.split(",").pop();
    const startY = start.split(",").unshift();
    const startX = start.split(",").pop();
    if(startY == pointAY || startY == pointBY || startX == pointAX || startX == pointBX){
      return true;
    }
  }
  return false;
}

function CreatePoint(y, x, y1, x1){
  return {pointA:`${y},${x}`, pointB:`${y1},${x1}`, steps:0};
}

Run("Day 10 part one", "Pipe Maze", PartOne);
// Run("Day 10 part two", "Pipe Maze", PartTwo);