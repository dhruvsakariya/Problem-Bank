import React, { useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import { useAppDispatch } from "../../app/hooks";
import { setQuestions } from "../../features/contest/contestSlice";
import { getRandomProblemsArray } from "../../utils/problems";

const Problem = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const problems = (await import("../../utils/problems")).problems;

      const questions = getRandomProblemsArray(problems, 5);

      dispatch(setQuestions(questions));
    })();
  }, []);

  return (
    <div>
      <TopBar />
      <WorkSpace />
    </div>
  );
};

export default Problem;
