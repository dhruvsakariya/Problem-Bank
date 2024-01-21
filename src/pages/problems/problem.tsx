import React, { Fragment, useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import { useAppDispatch } from "../../app/hooks";
import { setQuestions } from "../../features/contest/contestSlice";
import { getRandomProblemsArray } from "../../utils/problems";
import { useLazyGetAuthTokenQuery } from "../../features/contest/contestAPI";

const Problem = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [fetchAuthToken, { isFetching }] = useLazyGetAuthTokenQuery();

  useEffect(() => {
    (async () => {
      const problems = (await import("../../utils/problems")).problems;

      const questions = getRandomProblemsArray(problems, 5);

      dispatch(setQuestions(questions));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetchAuthToken();
      console.log(response);
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
