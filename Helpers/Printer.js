export function PrintPuzzleStart(day, puzzleName){
  console.log(`--- Day ${day}: ${puzzleName} ---`)
}

export function PrintPuzzleSolution(solution){
  console.log(`--- Solution: ${solution} ---`)
}

export function PrintRunTime(start, end){
  console.log(`--- Compute time: ${start - end}ms ---`)
}

export function PrintMap(map){
  for(let y = 0; y < map.length; y++){
    console.log(...map[y])
  }
}