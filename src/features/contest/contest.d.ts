import { Problem } from "../../utils/types/Problem";

type Questions = Array<{
  key: string;
  value: Problem;
  language: Language;
  code : {
    [key in Language]: string; // You can replace 'string' with the type you want for values
  }
}>;



export type Language = "javascript" | "cpp" | "java";

export { Questions, Language };
