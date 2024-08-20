import React from "react";
// import mindsatLoader from '/mindsatLoader.gif'
import mindsatLoader from "../../assets/Admin/Single_Loader.gif";

const Loader = () => {
  return (
    <div className="w-full     flex justify-center items-center  bg-opacity-25 z-10">
      <img
        src={mindsatLoader}
        className="w-[80px] animate-spin animate-opacitychange  "
        alt="Loading..."
      />
    </div>
  );
};

export default Loader;
