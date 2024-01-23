import { Problem } from "../../utils/types/Problem";

type Question = {
  key: string;
  value: Problem;
  language: Language;
  submitted: boolean;
  code: {
    [key in Language]: string; // You can replace 'string' with the type you want for values
  };
};
type Questions = Array<Question>;

export type Language = "python3" | "cpp" | "java";

interface ExecuteProgramResponse {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: string;
  compilationStatus: null | string;
  projectKey: null | string;
}

export { Question, Questions, Language, ExecuteProgramResponse };
