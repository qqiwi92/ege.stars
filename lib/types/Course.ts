import { Excercise } from "./Excercise";
import { NumberSet } from "./NumberSet";

export type Course = {
  name: string;
  excercises: Excercise[];
  first_part: number[];
  sets: NumberSet[];
};

