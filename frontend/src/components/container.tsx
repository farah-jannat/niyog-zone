import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = (props: Props) => {
  const { children, className } = props;

  // return (
  //   <div className={`${className}`}>
  //     <div className="mx-auto overflow-x-hidden px-4 md:max-w-[1200px] md:px-6 xl:max-w-[1450px] 2xl:max-w-[1736px] xl:px-[60px]">
  //       {children}
  //     </div>
  //   </div>
  // );

  return (
    <div className={`${className}`}>
      <div
        className={`px-4 max-w-[450px] md:max-w-[1000px] mx-auto  md:px-6 xl:px-[60px] xl:max-w-[1440px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
