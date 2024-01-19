import React, { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

const WorkSpace = () => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <div className="bg-dark-fill-2">
        {/* <Playground
          problem={problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        /> */}

        {/* {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )} */}
      </div>
    </Split>
  );
};

export default WorkSpace;
