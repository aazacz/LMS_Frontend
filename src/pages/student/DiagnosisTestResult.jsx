import { React, useState, useEffect , useRef } from "react";
import { Link } from "react-router-dom";
import DoughnutChart from "./DoughnutChart";
import Background from "../../components/reusable/Background";
import axios from "axios";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
const DiagnosisTestResult = () => {
  
  const baseURL = process.env.REACT_APP_API_URL;
  const [testDetails, setTestDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const topRef = useRef(null);



  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await axiosInstanceStudent.get(
          `api/diagnosis/get-active-diagnosis`
        );
        setTestDetails(response.data);
      } catch (error) {
        console.error("Error fetching test details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [baseURL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!testDetails) {
    return <div>Error loading test details.</div>;
  }
  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="Test  w-screen h-screen overflow-y-scroll p-2 relative">
      <div className="fixed top-0 left-0 -z-10">
        <Background />
      </div>
      <div className="w-full h-max px-5 md:px-10 py-4 md:py-8">
        <div className="w-full h-max  rounded-[35px] bg-white border-[#0066DE]  border-2 flex flex-col justify-center items-center">
          <h1 className="text-center text-base md:text-xl font-poppins font-semibold p-8">
            Thank you for your patience. <br />
            We’ve analysed your test and profile. The courses suggested will be
            on your dashboard.
            <br />
            You can also choose tutor of your choice for your interested course.
          </h1>

          <h1 className="font-bold md:text-2xl font-poppins text-lg ">
            Your Score : 35/40
          </h1>
          {/*  Button  */}
          <div className="w-full flex justify-center items-center px-2 flex-wrap  gap-x-8">
            <Link to="/student">
              <button className="text-[#0066DE] rounded-md my-2 text-sm border-[1px] border-[#0066DE] px-5 py-4 md:text-lg font-poppins font-semibold">
                {" "}
                Go to Dashboard
              </button>
            </Link>
            <button
              className="bg-[#0066DE] rounded-md my-2 px-5 py-4 text-white font-semibold font-poppins"
              onClick={handleScrollToTop}
            >
              {" "}
              View Solutions
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-max px-5 md:px-10 py-4 md:py-8">
        <div className="w-full -200">
          <div className="w-full px-4 rounded-[35px] flex flex-wrap bg-white border-[#0066DE] gap-8 border-2 py-10">
            <h1 className="font-poppins font-bold text-base md:text-xl">
              Overall Analysis
            </h1>
            <div className="w-max h-[170px] relative flex flex-wrap items-center justify-center">
              <div className="w-full h-full  flex justify-center items-center">
                <DoughnutChart />
              </div>

              <h1 className="font-poppins font-bold text-xs border  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                10 Questions
              </h1>
            </div>

            <span className="flex items-center gap-x-2">
              {" "}
              <span className="w-6 h-6 rounded-full bg-[#444444]"></span>
              <h2> 10 Questions</h2>
            </span>

            <span className="flex items-center gap-x-2">
              {" "}
              <span className="w-6 h-6 rounded-full bg-[#67FE4E]"></span>
              <h2> 10 Questions</h2>
            </span>
            <span className="flex items-center gap-x-2">
              {" "}
              <span className="w-6 h-6 rounded-full bg-[#FE4E4E]"></span>
              <h2> 10 Questions</h2>
            </span>
            <span className="flex items-center gap-x-2">
              {" "}
              <span className="w-6 h-6 rounded-full bg-[#FB4EFE]"></span>
              <h2> 10 Questions</h2>
            </span>
          </div>
        </div>
      </div>
      <div ref={topRef}>
        <div className="w-full h-max px-5 md:px-10 py-4 md:py-8">
          {" "}
          <div className="w-full">
            <h1 className="  font-poppins font-semibold text-base md:text-xl">
              Explanation
            </h1>
            {testDetails?.questions?.map((question, index) => (
              <div
                key={question._id}
                className="bg-white w-full p-8 rounded-[35px] my-6 border-[#0066DE] border-2 py-3"
              >
                <div className=" flex mt-2">
                  <div className="flex  items-center gap-x-3">
                    <div className="w-7 h-7 text-sm bg-black rounded-full text-white font-semibold font-poppins flex justify-center items-center">
                      {index + 1}
                    </div>
                    <h1 className="text-sm md:text-base font-poppins font-semibold">
                      {question.question}
                    </h1>
                  </div>
                </div>
                <div className="text-sm md:text-base w-full">
                  {question.choices.map((choice, idx) => (
                    <div key={idx}>
                      <span className="flex gap-x-2 items-center">
                        <div className="w-1 h-1 rounded-full bg-black"></div>{" "}
                        {choice.choiceText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisTestResult;
