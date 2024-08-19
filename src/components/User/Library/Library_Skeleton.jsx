import React from "react";

const Library_Skeleton = () => {
  const skeletons = Array.from({ length: 5 });

  return (
    <div className="w-full mb-4">
      <div className="max-w-sm m-4 h-16  bg-[#F4F5FB] rounded-md"></div>
      <div className="w-full px-6 flex flex-wrap gap-6 justify-start items-center">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="h-56 w-[250px] bg-[#F4F5FB] rounded-lg shadow-xl flex flex-col justify-start items-start gap-4 p-6"
          >
            <div className="h-36 w-[200px] bg-gray-200"></div>
            <div className="h-3 w-[200px] rounded-md bg-gray-200"></div>
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-2 w-[150px] rounded-md bg-gray-200"></div>
                <div className="h-2 w-[150px] rounded-md bg-gray-200"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library_Skeleton;
