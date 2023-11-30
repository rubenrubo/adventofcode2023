import * as fs from 'fs';

export function ReadAsString(fileName) {
  try {
    const data = fs.readFileSync(`../PuzzleInputs/${fileName}`, { encoding: 'utf8' });
    return data.split(",");
  } catch (err) {
    console.log(err);
  }
}