import React, { useContext, useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";
import { SocketContext } from "../../../pages/problems/problem";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Message } from "webstomp-client";
import { toast } from "react-toastify";
import { setProblemSubmitted } from "../../../features/contest/contestSlice";

type EditorFooterProps = {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ setSuccess }) => {
  const [method, setMethod] = useState<"run" | "submit">("run");

  const dispatch = useAppDispatch();
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

  const socketConnected = useAppSelector(
    (state) => state.contest.socketConnected
  );

  const authToken = useAppSelector((state) => state.contest.authToken);

  if (socketClient && socketClient.current && socketClient.current.connected) {
  }

  useEffect(() => {
    if (!socketConnected || !socketClient?.current) return;

    const { id } = socketClient.current.subscribe(
      "/user/queue/execute-i",
      (message: Message) => {
        const statusCode = parseInt(message.headers.statusCode as string, 10);
        if (statusCode === 201) {
          socketClient.current?.send(
            "/app/execute-ws-api-token",
            problem.testCases,
            {
              message_type: "input",
            }
          );
        } else if (statusCode === 200) {
          if (method === "run") {
            if (message.body === problem.expectedOutput) {
              toast.success("Congrats! All tests passed!", {
                position: "bottom-center",
                autoClose: 3000,
                theme: "dark",
              });
            } else {
              if (message.body.trim()) {
                toast.error(message.body, {
                  position: "bottom-center",
                  autoClose: 5000,
                  theme: "dark",
                });
              }
            }
          } else if (method === "submit") {
            dispatch(setProblemSubmitted({ submitted: true }));
            if (message.body === problem.expectedOutput) {
              toast.success("Congrats! Solution Accepted", {
                position: "bottom-center",
                autoClose: 3000,
                theme: "dark",
              });
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 4000);
            } else {
              if (message.body.trim()) {
                toast.warning("Submitted! Please verify before proceeding to the next question.", {
                  position: "bottom-center",
                  autoClose: 3000,
                  theme: "dark",
                });
              }
            }
          }
        }
      }
    );

    // Cleanup: Unsubscribe and close the WebSocket when the component unmounts
    return () => {
      if (socketClient.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        socketClient.current.unsubscribe(id);
      }
    };
  }, [socketConnected, problemIdx, method]); // Empty dependency array ensures this effect runs only once, when the component mounts

  const executeCode = () => {
    const data = JSON.stringify({
      script: userCode,
      language: problemLanguage,
      versionIndex: 4,
    });
    if (socketClient)
      socketClient.current?.send("/app/execute-ws-api-token", data, {
        message_type: "execute",
        token: authToken,
      });
  };

  const handleRun = () => {
    try {
      setMethod("run");
      executeCode();
    } catch (error: any) {
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setMethod("submit");
      executeCode();
    } catch (error: any) {
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
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
