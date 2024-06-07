import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import "./Animation_Methodology.css";

const details = () => [
  {
    number: 1,
    title: "Student Focused",
    description: "lorem ipsum",
  },
];

const Animation_Methodolgy = () => {
  return (
    <div className="animation-methodology-main-conatainer bg-slate-300 my-8">
      <div className="animation-methodology-title-conatainer">
        <div className="animation-methodology-title-comment">
          Its way too simple😊
        </div>
        <div className="header text-left">

        <h1 className="animation-methodology-main-title w-full text-left ">Our Methodology</h1>
        </div>
        <div className="animation-methodology-sub-title">
          Create Effective Habits by Encouraging Efforts only.Results Follow.
        </div>
      </div>

      <div className="animation-methodolgy-content-container">
       
        <div className="animation-methodology-content-card1">
          <div className="animation-metodology-content-card-number ">01</div>
          <div className="animation-methodology-card-number">
            <CircleIcon style={{ fontSize: "10px" }} />
          </div>
          <div className="animation-methodology-card-title">
            Student Focused
          </div>
          <div className="animation-methodology-card-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            obcaecati, saepe rem itaque suscipit aspernatur, porro expedita
            dolorem assumenda et praesentium eaque in nesciunt, debitis veniam
            sequi. Debitis, corrupti animi.
          </div>
        </div>


        <div className="animation-methodology-content-card1">
          <div className="animation-metodology-content-card-number">02</div>
          <div className="animation-methodology-card-symbol ">
            <CircleIcon style={{ fontSize: "10px" }} />
            <CircleIcon style={{ fontSize: "10px" }} />
          </div>
          <div className="animation-methodology-card-title">
            Student Focused
          </div>
          <div className="animation-methodology-card-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            obcaecati, saepe rem itaque suscipit aspernatur, porro expedita
            dolorem assumenda et praesentium eaque in nesciunt, debitis veniam
            sequi. Debitis, corrupti animi.
          </div>
        </div>


        <div className="animation-methodology-content-card1">
          <div className="animation-metodology-content-card-number">03</div>
          <div className="animation-methodology-card-number">
            <WorkspacesRoundedIcon />
          </div>
          <div className="animation-methodology-card-title">
            Student Focused
          </div>
          <div className="animation-methodology-card-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            obcaecati, saepe rem itaque suscipit aspernatur, porro expedita
            dolorem assumenda et praesentium eaque in nesciunt, debitis veniam
            sequi. Debitis, corrupti animi.
          </div>
        </div>


      </div>
    </div>
  );
};

export default Animation_Methodolgy;
