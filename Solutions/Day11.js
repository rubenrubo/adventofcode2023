import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { Run } from "./SolutionBase.js";

function PartOne(){
  return Solve(2);
}

function PartTwo(){
  return Solve(1000000);
}

function Solve(dimensions) {
  const map = SplitOnNewLines("day11.txt").map(line => line.split(""));

  const points = [];
  const emptyRows = [];
  const emptyColumns = [];

  for (let y = 0; y < map.length; y++) {
    if (map[y].every(x => x === '.')) {
      emptyRows.push(y);
    }
    for (let x = 0; x < map[y].length; x++) {
      if (y == 0 && map.every(c => c[x] === '.')) {
        emptyColumns.push(x);
      }
      if (map[y][x] == '#') {
        points.push({ x, y, visited: false });
      }
    }
  }

  let sum = 0;
  points.forEach(point => {
    for (let i = 0; i < points.length; i++) {
      point.visited = true;
      if (!points[i].visited) {

        let distance = (Math.abs(point.x - points[i].x)) + (Math.abs(point.y - points[i].y));

        let eRows = 0;
        for (let x = Math.min(points[i].y, point.y) + 1; x < Math.max(points[i].y, point.y); x++) {
          if (emptyRows.includes(x)) {
            // -1 because we already took a step and 
            // this should be subtracted from the total amount of  extra dimensions
            eRows += dimensions -1;
          }
        }

        let eColumns = 0;
        for (let x = Math.min(points[i].x, point.x) + 1; x < Math.max(points[i].x, point.x); x++) {
          if (emptyColumns.includes(x)) {
            eColumns += dimensions -1;
          }
        }
        sum += distance + eColumns + eRows;
      }
    }
  });
  return sum;
}

Run("Day 11 part one", "Cosmic Expansion", PartOne);
Run("Day 11 part two", "Cosmic Expansion", PartTwo);