import { GetRawInput } from "../Helpers/FileReader.js";
import { Run } from "./SolutionBase.js";


function PartOne(){
  const input = GetRawInput("day8.txt");
  const steps = input.split(/\n\s*\n/).shift();
  const locations = input.split(/\n\s*\n/).pop().split(/\r?\n/);
  const destination = "ZZZ";

  const tree = CreateNodeTree(locations);

  let currentPosition = "AAA";
  let directionOptions = tree[currentPosition];

  let stepsTaken = 0;
  while(currentPosition != destination){
    for(let i = 0; i < steps.length; i++){
      if(steps[i] == "L"){
        currentPosition = directionOptions.left;
      }

      if(steps[i] == "R"){
        currentPosition = directionOptions.right;
      }

      directionOptions = tree[currentPosition];
      stepsTaken++;
      if(currentPosition == destination){
        return stepsTaken;
      }
    }
  }
  return stepsTaken;
}

function CreateNodeTree(locations){
  const map = {};
  for(let i = 0; i < locations.length; i++){
    const nodeName = locations[i].split('=').shift().trim();
    const left = locations[i].split('=').pop().trim().split(",")[0].replace('(', '');
    const right = locations[i].split('=').pop().trim().split(",")[1].trim().replace(')', '');
    map[nodeName] = {
      left: left,
      right: right
    }
  }
  return map;
}

Run("Day 8 part one", "Haunted Wasteland", PartOne);