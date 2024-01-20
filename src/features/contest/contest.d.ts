import { Problem } from "../../utils/types/Problem";

type Questions = Array<{
  key: string;
  value: Problem;
  language: Language;
}>;

export type Language = "javascript" | "cpp" | "java";

export { Questions, Language };
