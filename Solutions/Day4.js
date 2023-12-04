import { Run } from "./SolutionBase.js";
import { SplitOnNewLines } from "../Helpers/FileReader.js";

function PartOne(){
  const lines = SplitOnNewLines("day4.txt");
  let result = 0;
  lines.forEach(element => {
    const numbers = element.split(": ").pop().split("|");
    const winningNumbers = numbers[0].split(" ").filter(x => x !== '').map(number => Number(number));
    const cardNumbers = numbers[1].split(" ").filter(x => x !== '').map(number => Number(number));
    const matches = GetMatchingNumbers(cardNumbers, winningNumbers);
    if(matches > 0){
      result += (Math.pow(2, matches-1));
    }
  });
  return result;
}

function PartTwo(){
  const lines = SplitOnNewLines("day4.txt");
  let cardAmount = [];
  let sum = 0;

  lines.forEach(element => {
    cardAmount.push(1);
  });

  lines.forEach((element, index) => {
    const numbers = element.split(": ").pop().split("|");
    const winningNumbers = numbers[0].split(" ").filter(x => x !== '').map(number => Number(number));
    const cardNumbers = numbers[1].split(" ").filter(x => x !== '').map(number => Number(number));
    const matches = GetMatchingNumbers(cardNumbers, winningNumbers);
    for(let i = 1; i <= matches; i++){
      cardAmount[index + i] = (cardAmount[index + i]) + 1 * cardAmount[index];
    }
    sum += cardAmount[index];
  });
  return sum;
}

function GetMatchingNumbers(cardNumbers, winningNumbers){
  let matches = 0;
  cardNumbers.forEach((number) => {
    if(winningNumbers.includes(number)){
      matches ++;
    }
  });
  return matches;
}

Run("Day 4 part one", "Scratchcards", PartOne);
Run("Day 4 part two", "Scratchcards", PartTwo);