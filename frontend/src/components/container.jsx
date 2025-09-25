import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <div
        className={`px-[16px] max-w-[450px] md:max-w-[1000px] mx-auto  md:px-[24px] xl:px-[60px] xl:max-w-[1440px] 
          ${className} `}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
