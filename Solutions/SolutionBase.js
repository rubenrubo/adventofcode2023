import { PrintPuzzleSolution, PrintPuzzleStart, PrintRunTime } from "../Helpers/Printer.js";

export function Run(day, puzzleName, solution){
  PrintPuzzleStart(day, puzzleName);
  const start = performance.now();
  const result = solution();
  const end = performance.now();
  PrintPuzzleSolution(result);
  PrintRunTime(start, end);
}