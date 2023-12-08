import { SplitOnNewLines } from "../Helpers/FileReader.js";
import { GetAmountOfCharInString } from "../Helpers/StringUtils.js";
import { Run } from "./SolutionBase.js";

function PartOne(){
  return Solve(false); 
}

function PartTwo(){
  return Solve(true); 
}

function Solve(partTwo) {
  const hands = SplitOnNewLines("day7.txt");

  while (true) {
    let swapped = false;
    for (let i = 0; i < hands.length - 1; i++) {
      const originalHandOne = hands[i].split(" ").shift();
      const originalHandTwo = hands[i + 1].split(" ").shift();
      let handOne = hands[i].split(" ").shift();
      let handTwo = hands[i + 1].split(" ").shift();
      if(partTwo){
        handOne = CheckForJokers(handOne);
        handTwo = CheckForJokers(handTwo);
      }
      if (NeedsSwap(handOne, handTwo, originalHandOne, originalHandTwo)) {
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
  return result;
}

function CheckForJokers(hand){
  const joker = "J";

  if(GetAmountOfSameInHand(hand) == 5 && hand[0] == joker){
    return hand;
  }
  const mostCommonCard = maxCount(hand);

  for(let i = 0; i < hand.length; i++){
    if(hand[i] == joker){
      hand = hand.replace(hand[i], mostCommonCard);
    }
  }
  return hand;
}

function maxCount(input) {
  var max = 0,
     maxChar = '';
     input.split('').forEach(function(char){
    if(input.split(char).length > max && char != 'J') {
        max = input.split(char).length;
        maxChar = char;
     }
  });
  return maxChar;
}

function NeedsSwap(handOne, handTwo, originalHandOne, originalHandTwo) {
  const handOneSameOfKind = GetAmountOfSameInHand(handOne);
  const handTwoSameOfKind = GetAmountOfSameInHand(handTwo);

  if (handOneSameOfKind > handTwoSameOfKind) {
    return true;
  }

  if (handOneSameOfKind < handTwoSameOfKind) {
    return false;
  }

  if (handOneSameOfKind == 5) {
    return FirstHandHasHighestCard(originalHandOne, originalHandTwo);
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

  return FirstHandHasHighestCard(originalHandOne, originalHandTwo);
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
  for (let i = 0; i < input.length; i++) {
    if (!uniq.includes(input[i])) {
      uniq += input[i];
    }
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
          if (input[i] == input[j]) 
              count++; 
      } 
      if (count > maxcount) { 
          maxcount = count; 
      } 
  } 
  return maxcount; 
}


function GetAmountOfPairs(input) {
  let maxcount = 0; 
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
  return maxcount / 2;
}

function GetCardValue(input) {
  // order for part 1
  // const order = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  // order for part 2
  const order = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  return order.indexOf(input);
}

function GetFirstCharFromString(input) {
  return Array.from(input)[0];
}

// Run("Day 6 part one", "Camel Cards", PartOne);
Run("Day 7 part two", "Camel Cards", PartTwo);