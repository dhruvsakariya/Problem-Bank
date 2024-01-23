import { useEffect, useState, type FC } from "react";
import Timer from "../Timer/Timer";

// Assets
import logo from "../../assets/JD_logo_white-fb3f0398.png";
import avatar from "../../assets/avatar.png";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

interface Props {}

const TopBar: FC<Props> = () => {
  const limit = 5;

  const navigate = useNavigate();

  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(0);

  const questions = useAppSelector((state) => state.contest.questions);

  useEffect(() => {
    let count = 0;

    questions.forEach((question) => {
      if (question.submitted) {
        count++;
      }
    });

    setCompleted(count);
  }, [questions]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (completed === limit)
      timeoutId = setTimeout(() => setShowResult(true), 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [completed]);

  const handleViewResult = () => {
    navigate("/result");
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className={"flex w-full items-center justify-between"}>
        <a
          href="https://www.jdoodle.com"
          className="h-[36px] flex-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Logo" height={100} width={100} />
        </a>

        <div className="flex items-center gap-4 flex-1 justify-center">
          {!showResult ? (
            <div className="w-full max-w-[250px]">
              <div className="mb-1 flex items-center justify-between gap-4">
                <h6 className="block antialiased tracking-normal font-sans text-sm font-semibold leading-relaxed text-dark-gray-8">
                  Submitted
                </h6>
                <h6 className="flex items-center antialiased tracking-normal font-sans text-sm font-semibold leading-relaxed text-dark-gray-8">
                  {completed}
                  <span className="mx-0.5">&#47;</span>5
                </h6>
              </div>
              <div className="flex flex-start bg-dark-gray-6/75 overflow-hidden w-full font-sans rounded-full text-xs font-medium h-2 ">
                <div
                  className="flex justify-center items-center h-full overflow-hidden break-all rounded-full bg-light-green-s text-white"
                  style={{
                    width: `${completed * 20}%`,
                    transition: "width 1s ease-in 0s",
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="px-5 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg"
              onClick={handleViewResult}
            >
              View Result
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <Timer />

          <div className="cursor-pointer group relative">
            <img
              src={avatar}
              alt="Avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
