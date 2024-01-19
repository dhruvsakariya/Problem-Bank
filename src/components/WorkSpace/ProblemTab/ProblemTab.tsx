import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "../../../styles/react-tabs.css";

const ProblemTab = () => {
  const tabs = [
    { name: "Problem 1" },
    { name: "Problem 2" },
    { name: "Problem 3" },
    { name: "Problem 4" },
    { name: "Problem 5" },
  ];

  return (
    <Tabs
      // selectedIndex={0}
      onSelect={(index) => {
        // dispatch(setTabsIdx({ tabId, index }));
      }}
    >
      <TabList>
        {tabs.map((tab, index) => {
          return (
            <Tab key={index}>
              <span>{tab.name}</span>
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
