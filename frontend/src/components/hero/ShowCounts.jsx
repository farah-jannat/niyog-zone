import React from "react";

const ShowCounts = ({ data, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-[8px] card-gradient-brown rounded-[8px] min-h-[138px] ${className}`}
    >
      <h1 className="font-bold text-[32px] text-Black">
        {data.counts}
        <span className="text-Apple_Green">
          {data == data.Jobs ? "M" : "K"}
        </span>
      </h1>
      <p>{data.title}</p>
    </div>
  );
};

export default ShowCounts;
