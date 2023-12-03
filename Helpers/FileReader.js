import * as fs from 'fs';

export function SplitOnNewLines(fileName) {
  try {
    const data = fs.readFileSync(`../PuzzleInputs/${fileName}`, { encoding: 'utf8' });
    return data.split(/\r?\n/);
  } catch (err) {
    console.log(err);
  }
}


export function CreateMap(fileName) {
  try {
    const data = fs.readFileSync(`../PuzzleInputs/${fileName}`, { encoding: 'utf8' });
    const lines = data.split(/\r?\n/);

    let map = [];
    lines.forEach((line) => {
      let row = [];
      for(let i = 0; i < line.length; i++){
        row.push(line[i]);
      }
      map.push(row);
    });
    return map;
  } catch (err) {
    console.log(err);
  }
}