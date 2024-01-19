// import { validParentheses } from "../../../utils/problems/valid-parentheses";
import ProblemTab from "../ProblemTab/ProblemTab";
import { useAppSelector } from "../../../app/hooks";

const ProblemDescription = () => {
  // let problem = validParentheses;

  const problemIdx = useAppSelector((state) => state.contest.problemIdx);
  const problem = useAppSelector(
    (state) => state.contest.questions[problemIdx]
  ).value;

  let problemDifficultyClass = "";

  if (problem.difficulty === "Easy") {
    problemDifficultyClass = " bg-olive text-olive ";
  } else if (problem.difficulty === "Medium") {
    problemDifficultyClass = " bg-dark-yellow text-dark-yellow ";
  } else {
    problemDifficultyClass = "bg-dark-pink text-dark-pink";
  }

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}

      <ProblemTab />

      <div className="flex px-0 py-4 h-[calc(100vh-95px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem?.title}
              </div>
            </div>
            {problem && (
              <div className="flex items-center mt-3">
                <div
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {problem.difficulty}
                </div>
                {/* {(solved || _solved) && (
                  <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                    <BsCheck2Circle />
                  </div>
                )} */}
              </div>
            )}

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: problem.problemStatement,
                }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-white ">
                    Example {index + 1}:{" "}
                  </p>
                  {example.img && (
                    <img src={example.img} alt="" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{" "}
                      {example.inputText}
                      <br />
                      <strong>Output: </strong>
                      {example.outputText} <br />
                      {example.explanation && (
                        <>
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-8 pb-4">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc ">
                <div
                  dangerouslySetInnerHTML={{
                    __html: problem.constraints,
                  }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
