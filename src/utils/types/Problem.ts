export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  expectedText: string;
  stdin: string;
  explanation?: string;
  img?: string;
  result?: TestCaseResult;
};

export type TestCaseResult = "Passed" | "Failed";

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
  python3StarterCode: string;
  cppStarterCode: string;
  javaStarterCode: string;
  // handlerFunction: ((fn: any) => boolean) | string;
  // starterFunctionName: string;
  testCases: string;
  expectedOutput: string;
};
