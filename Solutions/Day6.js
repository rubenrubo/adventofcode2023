import { Run } from "./SolutionBase.js";

function PartOne() {
  const time = [57, 72, 69, 92];
  const distanceToBeat = [291, 1172, 1176, 2026];

  let result = [];

  time.forEach((race, index) => {
    let waysToWin = 0;
    for (let i = 0; i < race; i++) {
      let distance = i * (race - i);
      if (distance > distanceToBeat[index]) {
        waysToWin++;
      }
    }
    result.push(waysToWin);
  });

  const initialValue = 1;
  const factorWithInitial = result.reduce(
    (accumulator, currentValue) => accumulator * currentValue,
    initialValue,
  );
  
  return factorWithInitial;
}

function PartTwo(){
  let waysToWin = 0;
  for (let i = 0; i < 57726992; i++) {
    let distance = i * (57726992 - i);
    if (distance > 291117211762026) {
      waysToWin++;
    }
  }
  return waysToWin;
}

Run("Day 6 part one", "Wait For It", PartOne);
Run("Day 6 part two", "Wait For It", PartTwo);
