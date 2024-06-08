import React from "react";
import "./Aside_Section_Test_Page.css";
import Test1 from "../../../assets/Test_Page_Aside_Section/Test1.jpg";
import Course1 from "../../../assets/Test_Page_Aside_Section/Course1.jpg";
import Course2 from "../../../assets/Test_Page_Aside_Section/Course2.jpg";

const Aside_Section_Test_Page = () => {
  return (
    <div className="test-page-user-main-container">
      <div className="test-page-user-sub-container1"></div>
      <div className="test-page-user-sub-container2">
        <div className="test-page-aside-section-header">
          <div className="test-page-aside-section-header-sub-conatiner1 flex justify-center items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div className="test-page-aside-section-header-sub-conatiner2">
            <div className="test-page-aside-user-profile-picture"></div>
            <div className="test-page-aside-user-profile-details">
              <div className="test-page-aside-user-profile-name">
                Christian Bale
              </div>
              <div className="test-page-aside-user-profile-email">
                christianbale@gmail.com
              </div>
            </div>
            <div className="test-page-aside-user-profile-details-more flex justify-center items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
        <div className="test-aside-page-title ml-5">
          Incomplete Tests and Materials
        </div>
        <div className="test-aside-page-incomplete-tasks-container">
          <div className="test-aside-page-incomplete-tasks-header mt-2">
            Incomplete Tasks
          </div>
          <div className="test-aside-page-incomplete-tasks-content-conatainer">
            <div className="test-aside-page-content-card">
              <div className="w-full h-24 overflow-hidden rounded-t">
                <img src={Test1} />
              </div>
              <h5 className="text-sm font-semibold mx-2">SAT Practice Test</h5>
              <h5 className="text-xs mx-2 font-medium">
                English & Writing Skills Test
              </h5>
              <input className=" h-1 my-2 mx-2 " type="range" value={60} disabled/>
              <button className="text-xs  w-max h-max md:h-4 lg:h-8  border-2 border-yellow-500  rounded-xl my-2 mx-2 px-2 font-semibold">
                Complete Now
              </button>
            </div>
            <div className="test-aside-page-content-card">
              <div className="w-full h-24 overflow-hidden rounded-t">
                <img src={Test1} />
              </div>
              <h5 className="text-sm font-semibold mx-2">SAT Practice Test</h5>
              <h5 className="text-xs mx-2 font-medium">
                English & Writing Skills Test
              </h5>
              <input className=" h-1 my-2 mx-2 " type="range" value={40} disabled/>
              <button className="text-xs  w-max h-max md:h-4 lg:h-8  border-2 border-yellow-500  rounded-xl my-2 mx-2 px-2 font-semibold">
                Complete Now
              </button>
            </div>
          </div>
        </div>
        <div className="test-aside-page-materials-container">
          <div className="test-aside-page-incomplete-tasks-header mt-2">
            Materials
          </div>
          <div className="test-aside-page-incomplete-tasks-content-conatainer">
            <div className="test-aside-page-content-card">
              <div className="w-full h-24 overflow-hidden rounded-t">
                <img src={Course1} />
              </div>
              <h5 className="text-sm font-semibold mx-2">Course 1</h5>
              <h5 className="text-xs mx-2 font-medium">Chapter 1</h5>
              <button className="text-xs  w-max h-max md:h-4 lg:h-8  bg-yellow-600 rounded-xl my-2 mx-2 px-2 font-semibold">
                Download Now
              </button>
            </div>
            <div className="test-aside-page-content-card">
              <div className="w-full h-24 overflow-hidden rounded-t">
                <img src={Course2} />
              </div>
              <h5 className="text-sm font-semibold mx-2">Course 2</h5>
              <h5 className="text-xs mx-2 font-medium">Chapter 1</h5>
              <button className="text-xs w-max h-max md:h-4 lg:h-8  bg-yellow-600 rounded-xl my-2 mx-2 px-2 font-semibold">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside_Section_Test_Page;
