import { ReadAsString } from "../Helpers/FileReader.js";
import { Run } from "./SolutionBase.js";

function Solution(){
  ReadAsString("test.txt");
  return "some calculation";
}

Run("Day 1", "First puzzle", Solution);