export function GetNumbersFromStringArray(input){
  let result = [];

  input.forEach(element => {
    const match = [...element].reduce((x, y) => (isNumber(y) ? x + y : x),"");
    if(match){
      result.push(Number(match));
    }
  });
  return result;
}

export function ConvertStringNumbersFromStringArray(input){
  let result = [];
  const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const numberDict = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
  }
  input.forEach(line => {
    numbers.forEach(number => {
      while(line.includes(number)){
        const first = number.charAt(0);
        const last = number.charAt(number.length - 1);
        line = line.replace(number, first + numberDict[number] + last);
      }
    });    
    result.push(line);
  });
  return result;
}

function isNumber(input) {
  const numbers = "123456789";
  return numbers.includes(input) ? true : false;
}