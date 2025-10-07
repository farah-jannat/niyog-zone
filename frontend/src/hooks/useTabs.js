import { useState } from "react";

const useTabs = (props) => {
  const { tabs } = props;

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabIndex = (i) => {
    if (i >= 0 && i < tabs.length) {
      setCurrentTabIndex(i);
    }
  };

  return {
    tabs,
    currentTabIndex,
    handleTabIndex,
  };
};

export default useTabs;
