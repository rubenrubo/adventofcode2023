import * as fs from 'fs';

export function SplitOnNewLines(fileName) {
  try {
    const data = fs.readFileSync(`../PuzzleInputs/${fileName}`, { encoding: 'utf8' });
    return data.split(/\r?\n/);
  } catch (err) {
    console.log(err);
  }
}