import type { Problem } from "../types/Problem";

import { twoSum } from "./two-sum";
import { search2DMatrix } from "./search-a-2d-matrix";
import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { validParentheses } from "./valid-parentheses";
import { Questions } from "../../features/contest/contest";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  "jump-game": jumpGame,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
  // 5 more...
};

export function getRandomProblemsArray(
  obj: ProblemMap,
  count: number
): Questions {
  // Shuffle keys
  const shuffledKeys = Object.keys(obj).sort(() => 0.5 - Math.random());

  // Map to array of key-value pairs and slice
  const randomProblemsArray = shuffledKeys.slice(0, count).map(
    (key) =>
      ({
        key: key,
        value: obj[key],
        language: "javascript",
        code: {
          javascript: obj[key].javascriptStarterCode,
          cpp: obj[key].cppStarterCode,
          java: obj[key].javaStarterCode,
        },
      } as Questions[0])
  );

  return randomProblemsArray;
}
