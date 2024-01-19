export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

export type Difficulty = "Easy" | "Medium" | "Hard";

// local problem data
export type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  order: number;
  starterCode: string;
  // handlerFunction: ((fn: any) => boolean) | string;
  starterFunctionName: string;
};
