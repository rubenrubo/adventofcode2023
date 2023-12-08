import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { GetAmountOfCharInString } from "../Helpers/StringUtils.js";
import { Run } from "./SolutionBase.js";

const joker = 'J';

function PartTwo() {
  const hands = SplitOnNewLines("day7.txt");

  while (true) {
    let swapped = false;
    for (let i = 0; i < hands.length - 1; i++) {
      const handOne = hands[i].split(" ").shift();
      const handTwo = hands[i + 1].split(" ").shift();

      if (NeedsSwap(handOne, handTwo)) {
        swapped = true;
        [hands[i], hands[i + 1]] = [hands[i + 1], hands[i]];
      }
    }
    if (!swapped) {
      break;
    }
  }

  let result = 0;
  for(let i = 0; i < hands.length; i++){
    const bid = hands[i].split(" ").pop();
    result += bid * (i + 1);
  }

  // 249497242 too low
  // 249504377 too low
  return result;
}

function NeedsSwap(handOne, handTwo) {
  const handOneSameOfKind = GetAmountOfSameInHand(handOne);
  const handTwoSameOfKind = GetAmountOfSameInHand(handTwo);

  if (handOneSameOfKind > handTwoSameOfKind) {
    return true;
  }

  if (handOneSameOfKind < handTwoSameOfKind) {
    return false;
  }

  if (handOneSameOfKind == 5) {
    return (GetCardValue(GetFirstCharFromString(handOne)) > GetCardValue(GetFirstCharFromString(handTwo)));
  }

  if (IsFullHouse(handOne) && !IsFullHouse(handTwo)) {
    return true;
  }

  if (!IsFullHouse(handOne) && IsFullHouse(handTwo)) {
    return false;
  }

  const handOneAmountOfPairs = GetAmountOfPairs(handOne);
  const handTwoAmountOfPairs = GetAmountOfPairs(handTwo);

  if(handOneAmountOfPairs > handTwoAmountOfPairs){
    return true;
  }

  if(handOneAmountOfPairs < handTwoAmountOfPairs){
    return false;
  }

  return FirstHandHasHighestCard(handOne, handTwo);
}

function FirstHandHasHighestCard(firstHand, secondHand) {
  for (let i = 0; i < firstHand.length; i++) {
    if (GetCardValue(firstHand[i]) > GetCardValue(secondHand[i])) {
      return true;
    }
    if (GetCardValue(firstHand[i]) < GetCardValue(secondHand[i])) {
      return false;
    }
  }
  return false;
}

function IsFullHouse(input) {
  let uniq = "";
  const hasJoker = input.includes(joker);

  for (let i = 0; i < input.length; i++) {
    if (!uniq.includes(input[i])) {
      uniq += input[i];
    }
  }

  if(hasJoker && uniq.length == 3){
    return true;
  }

  if(uniq.length == 2){
    if(GetAmountOfCharInString(uniq[0], input) == 4 || GetAmountOfCharInString(uniq[1], input) == 4){
      return false;
    }
    return true;
  }

  return false;
}

function GetAmountOfSameInHand(input) {
  let maxcount = 0; 
  for (let i = 0; i < input.length; i++) { 
      let count = 0; 
      for (let j = 0; j < input.length; j++) { 
          if (input[i] == input[j] || input[j] == joker) 
              count++; 
      } 
      if (count > maxcount) { 
          maxcount = count; 
      } 
  } 
  return maxcount; 
}

console.log(GetAmountOfSameInHand("K4AJT"));


function GetAmountOfPairs(input) {
  let maxcount = 0; 
  let jokers = (input.match(/J/g)||[]).length;
  if(jokers == 3){
    maxcount +=2;
    jokers = 1;
  }
  for (let i = 0; i < input.length; i++) { 
      let count = 0; 
      for (let j = 0; j < input.length; j++) { 
          if (input[i] == input[j]) {
            count++; 
          }
      } 
      if (count == 2) { 
        maxcount++;
      }
  } 
  if(jokers > 0){
    maxcount+=2;
    jokers--;
  }
  return maxcount / 2;
}

// console.log(GetAmountOfPairs("9JTQJ"));
// "JJAJB"

function GetCardValue(input) {
  const order = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  return order.indexOf(input);
}

function GetFirstCharFromString(input) {
  return Array.from(input)[0];
}

// Run("Day 6 part two", "Camel Cards", PartTwo);