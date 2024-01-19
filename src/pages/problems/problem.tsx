import React, { Fragment, useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import { useAppDispatch } from "../../app/hooks";
import { setQuestions } from "../../features/contest/contestSlice";
import { getRandomProblemsArray } from "../../utils/problems";

const Problem = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const problems = (await import("../../utils/problems")).problems;

      const questions = getRandomProblemsArray(problems, 5);

      dispatch(setQuestions(questions));
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {!loading ? (
        <Fragment>
          <TopBar />
          <WorkSpace />
        </Fragment>
      ) : null}
    </div>
  );
};

export default Problem;
