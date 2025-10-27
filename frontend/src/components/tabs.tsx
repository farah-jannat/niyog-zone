"use client";

import clsx from "clsx";

const Tabs = (props) => {
  const { tabs, currentTabIndex, handleTabIndex } = props;

  return (
    <div className="flex items-center space-x-4 border-b bg-white p-[5px] rounded-[10px] border-gray-200 max-w-[400px] overflow-x-auto gray-scroll">
      {tabs.map((tab, index) => (
        <div key={tab.title} className="flex items-center">
          <button
            onClick={() => handleTabIndex(index)}
            className={clsx(
              "relative px-3 py-2 text-sm font-normal transition-colors capitalize whitespace-nowrap cursor-pointer",
              currentTabIndex === index
                ? "bg-Apple_Green rounded-[10px] text-black font-medium"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.title}
          </button>

          {/* Vertical divider except last one */}
          {index < tabs.length - 1 && (
            <div className="h-5 w-px bg-gray-200 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
