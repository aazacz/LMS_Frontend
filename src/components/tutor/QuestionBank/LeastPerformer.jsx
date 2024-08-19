import React from "react";

const LeastPerformer = ({ least }) => {
  return (
    <div className="w-full mt-8 h-72 flex flex-col">
      <p className="text-sm font-semibold p-2">Least Performing</p>
      <div className="w-full h-64 overflow-y-scroll no-scrollbar ">
        {least.map((item, index) => (
          <div
            key={index}
            className="w-[90%] h-max flex justify-start items-start p-2"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
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

export default LeastPerformer;
