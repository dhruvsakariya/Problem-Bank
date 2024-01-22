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
          let input = `5
        4 2 7 11 15 9
        3 3 2 4 6
        2 3 3 6
        6 1 3 2 7 4 5 12
        4 -10 -1 -18 -19 -19
        `;
          socketClient.current.send("/app/execute-ws-api-token", input, {
            message_type: "input",
          });
        } else if (statusCode === 200) {
          let ans = "0 1 \n1 2 \n0 1 \n3 5 \n1 2 \n";

          if (message.body === ans) {
            console.log("✅✅✅ Passed", "color: #bada55");
          }

          console.log(message.body);
        }
      }
    );

    socketClient.current.send("/app/execute-ws-api-token", data, {
      message_type: "execute",
      token: authToken,
    });

    // "0 1 \n1 2 \n0 1 \n3 5 \n1 2 \n"
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
