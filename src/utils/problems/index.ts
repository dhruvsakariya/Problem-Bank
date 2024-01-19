import type { Problem } from "../types/Problem";

import { twoSum } from "./two-sum";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "two-sum": twoSum,
};
