import { type FC } from "react";
import Timer from "../Timer/Timer";

// Assets
import logo from "../../assets/JD_logo_white-fb3f0398.png";
import avatar from "../../assets/avatar.png";

interface Props {}

const TopBar: FC<Props> = () => {
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
          <div className="w-full max-w-[250px]">
            <div className="mb-1 flex items-center justify-between gap-4">
              <h6 className="block antialiased tracking-normal font-sans text-sm font-semibold leading-relaxed text-dark-gray-8">
                Completed
              </h6>
              <h6 className="flex items-center antialiased tracking-normal font-sans text-sm font-semibold leading-relaxed text-dark-gray-8">
                1<span className="mx-0.5">&#47;</span>5
              </h6>
            </div>
            <div className="flex flex-start bg-dark-gray-6/75 overflow-hidden w-full font-sans rounded-full text-xs font-medium h-2 ">
              <div
                className="flex justify-center items-center h-full overflow-hidden break-all rounded-full bg-dark-green-s text-white"
                style={{ width: "20%" }}
              ></div>
            </div>
          </div>
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
