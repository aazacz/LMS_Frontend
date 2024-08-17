import React from "react";
import "./Background.css";

const Background = () => {
  return (
    <>
      <div className="w-screen h-[100vh] overflow-hidden relative ">
        <div className="mover rounded-full  w-[500px] h-[500px] opacity-45 blur-lg "></div>
        <div className="mover1 rounded-full  w-[400px] h-[400px] opacity-40 bg-[#25FC88] blur-lg "></div>
        <div className="mover2 rounded-full  w-[400px] h-[400px] opacity-40 bg-gradient-to-r from-blue-300 to-yellow-300 blur-lg "></div>
        <div className="mover3 rounded-full  w-[450px] h-[450px] opacity-40 bg-gradient-to-r from-yellow-200 to-green-500 blur-lg "></div>

        <div className="mover4 rounded-full  w-[350px] h-[350px] opacity-30 bg-gradient-to-r from-blue-400 to-emerald-400 blur-lg "></div>
      </div>
    </>
  );
};

export default Background;
