import clsx from "clsx";

interface Tab {
  title: string;
}

interface Props<T extends Tab> {
  tabs: T[];
  currentTabIndex: number;
  handleTabIndex: (i: number) => void;
}

const JobDetailsTab = <T extends Tab>(props: Props<T>) => {
  const { tabs, currentTabIndex, handleTabIndex } = props;

  return (
    <div className="flex items-center gap-x-4 max-w-[400px] overflow-x-auto gray-scroll">
      {tabs.map((tab, index) => (
        <div key={tab.title} className="flex items-center w-full">
          <button
            onClick={() => handleTabIndex(index)}
            className={clsx(
              "relative grow  px-3 py-2 transition-colors capitalize whitespace-nowrap cursor-pointer rounded-[4px] text-[#03050F] font-lato font-normal text-[16px]",
              currentTabIndex === index ? "bg-[#E8C092]" : "bg-[#E6E6E7]"
            )}
          >
            {tab.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobDetailsTab;
