import React, { useContext } from "react";
import { BsChevronUp } from "react-icons/bs";
import { SocketContext } from "../../../pages/problems/problem";
import { useAppSelector } from "../../../app/hooks";
import { Message } from "webstomp-client";

type EditorFooterProps = {
  handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
  const socketClient = useContext(SocketContext);

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

  const authToken = useAppSelector((state) => state.contest.authToken);

  const handleRun = () => {
    const data = JSON.stringify({
      script: userCode,
      language: problemLanguage,
      versionIndex: 4,
    });

    socketClient.current.subscribe(
      "/user/queue/execute-i",
      (message: Message) => {
        const statusCode = parseInt(message.headers.statusCode, 10);
        if (statusCode === 201) {
          socketClient.current.send(
            "/app/execute-ws-api-token",
            problem.testCases,
            {
              message_type: "input",
            }
          );
        } else if (statusCode === 200) {
          if (message.body === problem.expectedOutput) {
            console.log("%c✅✅✅ Passed", "color: #00d26a;");
          }
        }
      }
    );

    socketClient.current.send("/app/execute-ws-api-token", data, {
      message_type: "execute",
      token: authToken,
    });
  };

  return (
    <div className="flex bg-dark-layer-1 absolute bottom-0 z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2">
            Console
            <div className="ml-1 transform transition flex items-center">
              <BsChevronUp className="fill-gray-6 mx-1 fill-dark-gray-6" />
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            type="button"
            className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
