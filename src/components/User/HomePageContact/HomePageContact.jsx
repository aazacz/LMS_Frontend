import React from "react";
import "./HomePageContact.css";

const HomePageContact = () => {
  return (
    <div className="HomePageContact-main-main-container">
      <div className="HomePageContact-main-container bg-white  ">
        <div className="HomePageContact-sub-container1 ">
          <div className="HomePageContact-main-title text-md md:text-3xl lg:text-4xl">
            Your Gateway to your dream university is a click way.
          </div>
          <div className="w-44 md:w- lg:w-64 h-14 md:h-20 lg:h-36  flex justify-start md:justify-start lg:justify-center items-start md:items-start lg:items-center ">
            <button className="HomePageContact-faq-button  ">See FAQs</button>
          </div>
        </div>
        <div className="w-full   flex py-8 justify-center items-center">
          <div className="HomePageContact-sub-container2 ">
            <div className="HomePageContact-details-conatiner1 ">
              <div className="HomePageContact-details-sub-container1">
                <h2 className="HomePageContact-details-sub-name">NAME</h2>
                <input
                  className="HomePageContact-details-sub-name-input"
                  type="text"
                  placeholder="Enter Your Name"
                />
                <h2 className="HomePageContact-details-sub-name">EMAIL</h2>
                <input
                  className="HomePageContact-details-sub-name-input"
                  type="email"
                  placeholder="Enter Your Email Address"
                />
                <p className="HomePageContact-details-checkbox-data ml-5">
                  <input
                    className="HomePageContact-details-sub-checkbox"
                    type="checkbox"
                  />
                  I agree with{" "}
                  <span className="details-highlight cursor-pointer">
                    Terms of Use{" "}
                  </span>{" "}
                  and{" "}
                  <span className="details-highlight cursor-pointer">
                    {" "}
                    Privacy Policy
                  </span>
                </p>
              </div>
              <div className="HomePageContact-details-sub-container2">
                <h2 className="HomePageContact-details-sub-name">MESSAGE</h2>
                <textarea
                  className="HomePageContact-details-sub-name-input-message "
                  placeholder="Your Message...."
                />
                <button className="HomePageContact-details-SendButton ">
                  Send Message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3em"
                    height="3em"
                    viewBox="0 0 24 24"
                    fill="orange"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-right"
                  ></svg>
                </button>
              </div>
            </div>
            <div className="HomePageContact-details-conatiner2 ">
              <div className="HomePageConatct-details-support-call ">
                📞Call
              </div>
              <h2 className="text-xs font-bold cursor-pointer mb-10 ml-6">
                Schedule a Call{" "}
              </h2>
              <div className="HomePageConatct-details-support-call ">🐞Bug</div>
              <h2 className="text-xs font-bold cursor-pointer mb-10 ml-6">
                Report a Bug{" "}
              </h2>
              <div className="HomePageConatct-details-support-call">❓Help</div>
              <h2 className="text-xs font-bold cursor-pointer mb-10 ml-6">
                Ask any Question{" "}
              </h2>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageContact;
