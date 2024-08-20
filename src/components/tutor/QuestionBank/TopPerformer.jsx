import React from "react";

const TopPerformer = ({ best }) => {
  return (
    <div className="w-full  h-72 flex flex-col">
      <p className="text-sm font-semibold p-2">Top Performers in Tests</p>
      <div className="w-full  h-64  overflow-y-scroll no-scrollbar ">
        {best.map((item, index) => (
          <div
            key={index}
            className="w-full h-max border-b-[1px] border-gray-300  flex justify-start items-start p-2"
          >
            {/* user image div  */}
            <div className="w-10 h-10 rounded-full overflow-hidden ">
              <img src={item.image} alt="" />
            </div>
            <div className="w-max flex flex-col ml-2 justify-start items-start text-xs">
              <p>{item.name}</p> <p className="text-gray-500">{item.email}</p>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformer;
