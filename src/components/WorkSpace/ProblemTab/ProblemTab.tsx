import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "../../../styles/react-tabs.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setProblemIdx } from "../../../features/contest/contestSlice";

const ProblemTab = () => {
  const tabs = [
    { name: "Problem 1" },
    { name: "Problem 2" },
    { name: "Problem 3" },
    { name: "Problem 4" },
    { name: "Problem 5" },
  ];

  const dispatch = useAppDispatch();

  const problemIdx = useAppSelector((state) => state.contest.problemIdx);
  const questions = useAppSelector((state) => state.contest.questions);

  return (
    <Tabs
      selectedIndex={problemIdx}
      onSelect={(index) => {
        dispatch(setProblemIdx(index));
      }}
      className={"overflow-x-scroll no-scrollbar bg-dark-layer-2"}
    >
      <TabList>
        {tabs.map((tab, index) => {
          return (
            <Tab key={index}>
              <span
                className={`whitespace-nowrap ${
                  questions[index].submitted ? "!text-dark-green-s" : ""
                } `}
              >
                {tab.name}
              </span>
            </Tab>
          );
        })}
      </TabList>

      {tabs.map((tab, index) => {
        return <TabPanel key={index}></TabPanel>;
      })}
    </Tabs>
  );
};

export default ProblemTab;
