import { Problem } from "../../utils/types/Problem";

type Questions = Array<{
  key: string;
  value: Problem;
  language: Language;
  solved: boolean;
  code: {
    [key in Language]: string; // You can replace 'string' with the type you want for values
  };
}>;

export type Language = "python3" | "cpp" | "java";

export { Questions, Language };
