import { FC, useEffect, useState } from "react";
import { useLazyExecuteProgramQuery } from "../../features/contest/contestAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { Question } from "../../features/contest/contest";
import { setTestCaseResult } from "../../features/contest/contestSlice";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";
import { toast } from "react-toastify";

interface Props {}

const Result: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [execute] = useLazyExecuteProgramQuery();
  const questions = useAppSelector((state) => state.contest.questions);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    (async () => {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        for (let j = 0; j < question.value.examples.length; j++) {
          const example = question.value.examples[j];

          execute({
            script: question.code[question.language],
            stdin: example.stdin,
            language: question.language,
            versionIndex: 4,
          }).then((response) => {
            if (example.expectedText === response.data?.output) {
              dispatch(
                setTestCaseResult({ queIdx: i, caseIdx: j, result: "Passed" })
              );
            } else {
              dispatch(
                setTestCaseResult({ queIdx: i, caseIdx: j, result: "Failed" })
              );
            }
          });
        }
      }
    })();
  }, []);

  useEffect(() => {
    let allExamplesPassed = true;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      for (let j = 0; j < question.value.examples.length; j++) {
        const example = question.value.examples[j];

        if (example.result !== "Passed") {
          allExamplesPassed = false;
          break;
        }
      }

      if (!allExamplesPassed) {
        break;
      }
    }

    if (allExamplesPassed) {
      setCelebrate(true);
      toast.success("Congrats! All tests passed!", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
      });

      const timeoutId = setTimeout(() => {
        setCelebrate(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [questions, setCelebrate]);

  const { width, height } = useWindowSize();

  return (
    <div className="bg-dark-layer-1 flex h-screen overflow-hidden">
      <div className="w-[50vw] overflow-y-scroll mx-auto">
        {questions.map((question, index) => {
          return <Detail key={index} problem={question} />;
        })}

        <div className="h-[200px]" />
      </div>
      {celebrate && (
        <Confetti
          gravity={0.3}
          tweenDuration={5000}
          width={width - 1}
          height={height - 1}
        />
      )}
    </div>
  );
};

export default Result;

interface DetailProps {
  problem: Question;
}

const Detail: FC<DetailProps> = ({ problem }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  return (
    <div className="w-full px-5 overflow-auto">
      {/* testcase heading */}
      <div className="flex h-10 items-center space-x-6">
        <div className="relative flex h-full flex-col justify-center cursor-pointer">
          <div className="text-sm font-medium leading-5 text-white">
            {problem.value.title}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {problem.value.examples.map((example, index) => (
          <div
            className="mr-6 items-start mt-4 "
            key={example.id}
            onClick={() => setActiveTestCaseId(index)}
          >
            <div className="flex flex-wrap items-center gap-y-4">
              <div
                className={`font-medium items-center transition-all focus:outline-none inline-flex relative rounded-lg px-4 py-1 hover:bg-dark-fill-2 cursor-pointer whitespace-nowrap ${
                  activeTestCaseId === index ? " bg-dark-fill-2/[0.10]" : ""
                } ${
                  problem.value.examples[index].result === "Failed"
                    ? "!text-light-red-s"
                    : "text-white"
                } ${
                  problem.value.examples[index].result === "Passed"
                    ? "!text-light-green-s"
                    : "text-white"
                } `}
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
          {problem.value.examples[activeTestCaseId].inputText}
        </div>
        <p className="text-sm font-medium mt-4 text-white">Output:</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem.value.examples[activeTestCaseId].outputText}
        </div>
        <p className="text-sm font-medium mt-4 text-white">Expected:</p>
        <div
          className={`w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent  mt-2 ${
            problem.value.examples[activeTestCaseId].result === "Failed"
              ? "!text-light-red-s"
              : "text-white"
          } ${
            problem.value.examples[activeTestCaseId].result === "Passed"
              ? "!text-light-green-s "
              : "text-white"
          }`}
        >
          {problem.value.examples[activeTestCaseId].outputText}
        </div>
      </div>
    </div>
  );
};
