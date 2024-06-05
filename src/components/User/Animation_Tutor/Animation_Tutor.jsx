import React from "react";
import "./Animation_Tutor.css";
import Tutor1 from "../../../assets/Animation_Tutor/Tutor1.jpeg";
import Tutor2 from "../../../assets/Animation_Tutor/Tutor2.jpeg";
import Tutor3 from "../../../assets/Animation_Tutor/Tutor3.jpeg";
import Tutor4 from "../../../assets/Animation_Tutor/Tutor4.jpeg";
import Tutor5 from "../../../assets/Animation_Tutor/Tutor5.jpeg";
import Tutor6 from "../../../assets/Animation_Tutor/Tutor6.jpeg";

const Animation_Tutor = () => {
  return (
    <div className="animation-tutor-main-container">
      <div className="animation-tutor-sub-conatainer1">
        <div className="animation-tutor-sub-container-content">
          <div className="animation-tutor-sub-conatainer-title">
            Our Tutors Help You Achieve Your True Potential
          </div>
          <div className="animation-tutor-sub-conatiner-desc">
            We love what we do and we do it with passion.We value the
            experimenatation of the message and smart incentives
          </div>
          <div className="animation-tutor-sub-container-button">
            View All Tutors
          </div>
        </div>
        <div className="animation-tutor-sub-conatainer-founders">
          <div className="animation-tutor-tutor1">
            <img src={Tutor1} alt="Tutor Details" />
            <div className="animation-tutor-content">
              <h1>Amanda Shelmen</h1>
              <h3>
                Science Specialist(10 years) <br /> Teached upto 100+ PU Students
              </h3>
            </div>
          </div>

          <div className="animation-tutor-tutor1">
            <img src={Tutor2} alt="Tutor Details" />
            <div className="animation-tutor-content">
              <h1>Micheal Steel</h1>
              <h3>
                Math Specialist(12 years) <br /> Teached upto 100+ PU Students
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="animation-tutor-sub-conatainer2">
        <div className="animation-tutor-tutor1">
          <img src={Tutor3} alt="Tutor Details" />
          <div className="animation-tutor-content">
            <h1>Steven Barley</h1>
            <h3>
              Math Specialist(10 years) <br /> Teached upto 100+ PU Students
            </h3>
          </div>
        </div>
        <div className="animation-tutor-tutor1">
          <img src={Tutor4} alt="Tutor Details" />
          <div className="animation-tutor-content">
            <h1>Melissa Cooper</h1>
            <h3>
             Biology Specialist(10 years) <br /> Teached upto 100+ PU Students
            </h3>
          </div>
        </div>
        <div className="animation-tutor-tutor1">
          <img src={Tutor5} alt="Tutor Details" />
          <div className="animation-tutor-content">
            <h1>Emma Tyler</h1>
            <h3>
              Math Specialist(12 years) <br /> Teached upto 100+ PU Students
            </h3>
          </div>
        </div>
        <div className="animation-tutor-tutor1">
          <img src={Tutor6} alt="Tutor Details" />
          <div className="animation-tutor-content">
            <h1>David Steel </h1>
            <h3>
              Math Specialist(15 years) <br /> Teached upto 100+ PU Students
            </h3>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Animation_Tutor;
