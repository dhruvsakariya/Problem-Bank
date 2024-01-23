import { useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import EditorFooter from "./EditorFooter";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Language } from "../../../features/contest/contest";
import { setUserCode } from "../../../features/contest/contestSlice";
// import { validParentheses } from "../../../utils/problems/valid-parentheses";
// import { useRouter } from "next/router";

interface PlaygroundProps {
  //   problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({
  //   problem,
  setSuccess,
}) => {
  // let problem = validParentheses;

  const dispatch = useAppDispatch();

  const problemIdx = useAppSelector((state) => state.contest.problemIdx);
  const problem = useAppSelector(
    (state) => state.contest.questions[problemIdx]
  ).value;
  const problemLanguage = useAppSelector(
    (state) => state.contest.questions[problemIdx]
  ).language;
  const userCode = useAppSelector(
    (state) => state.contest.questions[problemIdx].code[problemLanguage]
  );

  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  // let [userCode, setUserCode] = useState<string>(problem.starterCode);

  const [settings, setSettings] = useState<ISettings>({
    fontSize: "16px",
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  //   useEffect(() => {
  //     const code = localStorage.getItem(`code-${pid}`);
  //     if (user) {
  //       setUserCode(code ? JSON.parse(code) : problem.starterCode);
  //     } else {
  //       setUserCode(problem.starterCode);
  //     }
  //   }, [pid, user, problem.starterCode]);

  const onChange = (value: string) => {
    dispatch(setUserCode({ code: value }));
    // localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  const getLanguageExtension = (language: Language) => {
    switch (language) {
      case "python3":
        return python();
      case "cpp":
        return cpp();
      case "java":
        return java();
      default:
        return cpp();
    }
  };

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav settings={settings} setSettings={setSettings} />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[51, 49]}
        minSize={52}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[getLanguageExtension(problemLanguage)]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>
        <div className="w-full px-5 overflow-auto pb-[52px]">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 "
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex relative rounded-lg px-4 py-1 hover:text-white hover:bg-dark-fill-2 cursor-pointer whitespace-nowrap ${
                      activeTestCaseId === index
                        ? "text-white bg-dark-fill-2/[0.12]"
                        : "text-gray-300/90"
                    }`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>

      <EditorFooter setSuccess={setSuccess} />
    </div>
  );
};
export default Playground;
