import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { Run } from "./SolutionBase.js";

function PartOne(){
  const sequence = SplitOnNewLines("day9.txt");
  let result = 0;
  sequence.forEach(seq => {
    result += GetHistoryValue(seq);
  });
  return result;
}

function GetHistoryValue(input){
  const seq = input.split(" ").map(Number);
  const allSeqs = GenerateSeqs([seq]);
  return GetExtrapolatedValueFromSeqs(allSeqs);
}

function GetExtrapolatedValueFromSeqs(input){
  input[input.length - 1].push(0);
  for(let i = input.length -1; i > 0; i--){
    let lastNumberOfBelowRow = input[i][input[i].length -1];
    let lastNumberOfAboveRow = input[i -1][input[i].length -1];
    input[i - 1].push(lastNumberOfBelowRow + lastNumberOfAboveRow);
  }
  const result = input[0][input[0].length -1]
  return result;
}

function GenerateSeqs(input){
  while(true){
    for(let i = 0; i < input.length; i++){
      let newSeq = GetDiff(input[i]);
      input.push(newSeq);
      if(newSeq.every(x => x == 0)){
        return input;
      }
    }
  }
}

function GetDiff(input){
  let result = [];
  for(let i = 0; i < input.length - 1; i++){
    result.push(input[i+1] - input[i]);
  }
  return result;
}

Run("Day 9 part one", "Mirage Maintenance", PartOne);
// Run("Day 9 part two", "Mirage Maintenance", PartTwo);