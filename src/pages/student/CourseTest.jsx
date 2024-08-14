import React, { useState, useEffect } from "react";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";
import Loader from "../../components/reusable/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import "./DiagnosisTest.css";
import Tooltip from "@mui/material/Tooltip";
import { setStudentDetails } from "../../store/reducers/StudentloginSlice";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CourseTest = () => {
  const student = useSelector((state) => state.StudentDetails);
  const dispatch = useDispatch();
  const [fontSize, setFontSize] = useState(15);
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [testId, setTestId] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questionStatuses, setQuestionStatuses] = useState({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
 
  const navigate = useNavigate();
  const {courseId, testid } = useParams()

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);


  useEffect(() => {
    console.log("use Effect running");

    async function fetchQuestions() {
      try {
        const response = await axiosInstanceStudent.get(`api/test/one-course-tests/${courseId}/${testid}`
        );
        const data = response.data;
        console.log("Fetched Data:", data);
        setTestId(response.data._id);
        const positiveMark = data.positiveMark;
        const negativeMark = data.negativeMark;

        if (data && data.questions && Array.isArray(data.questions)) {
          const formattedQuestions = data.questions.map((question) => ({
            positiveMark: positiveMark,
            negativeMark: negativeMark,
            text: question.question,
            questionId: question._id,
            options: question.choices.map((choice) => choice.choiceText),
          }));
          setQuestions(formattedQuestions);
          setLoading(false);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        if (error.response?.status === 403 && error.response?.data?.notPaid) {
          return navigate("/diagnosistest/payment");
        }
        if (
          error.response?.status === 400 &&
          error.response?.data?.alreadyTaken
        ) {
          return navigate("/student");
        }
        console.error("Error fetching data", error);
      }
    }



    fetchQuestions();
  }, []);

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      Swal.fire({
        title: "Fullscreen Mode Required",
        text: "You must be in fullscreen mode to take the test. Switching tabs is not allowed.",
        icon: "warning",
        confirmButtonText: "Go Fullscreen",
      }).then(() => {
        requestFullscreen();
      });
    }
  };

  const requestFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    // Function to handle visibility change (tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden && document.fullscreenElement) {
        let count = tabSwitchCount; // change to + 1 PENDING
        setTabSwitchCount(count);

        if (count > 2) {
          handleTestExit("Tab switch limit exceeded.");
        }
      }
    };

    // Timer functionality
    if (timeLeft === 0) {
      handleTestExit("Time's up!");
    }

    // Check if fullscreen mode is enabled
    if (!document.fullscreenElement) {
      Swal.fire({
        title: "Fullscreen Mode Required",
        text: "You must be in fullscreen mode to take the test. Switching tabs is not allowed.",
        icon: "warning",
        confirmButtonText: "Go Fullscreen",
      }).then(() => {
        requestFullscreen();
      });
    }

    // Add event listener for fullscreen changes
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up event listener
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitchCount]);

  const handleTestExit = async (message) => {
    try {
      setLoading(true);
      const res = await axiosInstanceStudent.post("api/test/submit-course-test", {
        testId,
        selectedAnswers,
      });
  
      dispatch(setStudentDetails({ ...student, isDiagnosisTestTaken: true }));
      exitFullscreen();
  
      await Swal.fire({
        title: "Test Exit",
        text: message,
        icon: "info",
        confirmButtonText: "OK",
      });
  
      navigate("/coursetest/CourseTestResult/" + res.data?._id);
    } catch (error) {
      console.error("Error submitting test:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error submitting your test. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await Swal.fire({
        title: "Do you want to submit the answers? You will not be able to continue this later.",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          confirmButton: "my-confirm-button",
          denyButton: "my-deny-button",
        },
      });
  
      if (!result.isConfirmed) return;
  
      setLoading(true);
      const res = await axiosInstanceStudent.post("api/test/submit-course-test", {
        testId,
        selectedAnswers,
      });
  
       
      exitFullscreen();
  
      await Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your answers have been submitted successfully.",
        customClass: {
          confirmButton: "my-toast-confirm-button",
        },
      });
  
      navigate("/coursetest/CourseTestResult/" + res.data?._id);
    } catch (error) {
      console.error("Error submitting test:", error);
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer = {
      questionId: currentQuestion.questionId,
      selectedOptionIndex: optionIndex
    };
  
    setSelectedAnswers(prevAnswers => {
      // Create a copy of the previous answers
      const updatedAnswers = [...prevAnswers];
      
      // Find if an answer for this question already exists
      const existingAnswerIndex = updatedAnswers.findIndex(
        answer => answer.questionId === currentQuestion.questionId
      );
  
      if (existingAnswerIndex !== -1) {
        // If it exists, update it
        updatedAnswers[existingAnswerIndex] = newAnswer;
      } else {
        // If it doesn't exist, add it
        updatedAnswers.push(newAnswer);
      }
  
      return updatedAnswers;
    });
  
    const updatedStatuses = { ...questionStatuses };
    updatedStatuses[currentQuestionIndex] = "answered";
    setQuestionStatuses(updatedStatuses);
  };

  const handleMarkForReview = () => {
    const updatedStatuses = { ...questionStatuses };
    updatedStatuses[currentQuestionIndex] = "review";
    setQuestionStatuses(updatedStatuses);
  };

  const handleClearResponse = () => {
    const updatedAnswers = { ...selectedAnswers };
    delete updatedAnswers[currentQuestionIndex];
    setSelectedAnswers(updatedAnswers);

    const updatedStatuses = { ...questionStatuses };
    updatedStatuses[currentQuestionIndex] = "notAnswered";
    setQuestionStatuses(updatedStatuses);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "answered":
        return "bg-green-500";
      case "review":
        return "bg-red-500";
      case "notAnswered":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    } else {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const scrollToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {loading && (
        <div className="absolute w-full h-screen bg-black bg-opacity-35 z-[99] flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="w-screen  h-screen flex flex-wrap-reverse relative">
        <div className="Test absolute w-full h-full flex flex-wrap-reverse overflow-y-scroll ">
          {/* Left Component */}
          <div className="w-full md:w-[60%] flex-1   p-5 h-full">
            <div className="w-full">
              <h2 className="font-semibold flex justify-center my-4 items-center font-poppins text-sm text-red-600">
                Switching Tabs will lead to automatic exit
              </h2>
              <h1 className="font-semibold font-poppins text-lg">
                Diagnosis Test
              </h1>
            </div>

            <div className="pl-5 mt-5">
              <div className="w-full bg-gray-200  relative flex flex-wrap min-h-10 justify-between pl-10 items-center pr-4">
                <div className="absolute left-0 z-10 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full z-20 bg-black text-white flex items-center justify-center">
                    {currentQuestionIndex + 1}
                  </div>
                  <div className="w-6 h-6 transform rotate-45 bg-black -ml-[22px] z-10"></div>
                </div>
                <h1 className="font-poppins font-semibold text-xs">
                  Single Answer -Correct :{currentQuestion?.positiveMark}M ,
                  Wrong :{currentQuestion?.negativeMark}M
                </h1>
                <div className="flex gap-x-4 items-center border-2">
                  <PiWarningOctagonDuotone className="text-black text-xl" />
                  <Tooltip label="Report Question">
                    {" "}
                    <h1 className="hidden md:block">Report Question</h1>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              <div className="min-h-12 overflow-y-auto">
                <h1
                  className="font-semibold"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {currentQuestion && currentQuestion.text}
                </h1>
              </div>
            </div>

            <div className="w-full mt-3 grid grid-flow-row grid-rows-4 gap-y-4">
              {currentQuestion &&
                currentQuestion.options &&
                currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className="h-10 flex items-center border-[1px] w-full px-4 gap-x-5 font-poppins font-semibold text-sm"
                    onClick={() => handleAnswerSelect(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={
                        selectedAnswers[currentQuestionIndex]
                          ?.selectedOptionIndex === index
                      }
                      readOnly
                    />
                    <h1>{option}</h1>
                  </div>
                ))}
            </div>

            <div className="w-full mt-5 flex justify-between items-center">
              <div className="w-full  flex justify-between items-center mb-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`${
                    currentQuestionIndex === 0
                      ? "bg-gray-300"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`${
                    currentQuestionIndex === questions.length - 1
                      ? "bg-gray-300"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          {/* Right Component */}
          <div className=" w-full md:w-[30%]  h-max md:h-screen border-l-2">
            <div className="flex gap-x-2 items-center h-10 bg-white  relative p-4">
              <span className="font-semibold">Time Left :</span>
              <span className="font-semibold">{formatTime(timeLeft)}</span>
              <div className="flex items-center absolute left-28">
                <Hourglass
                  visible={true}
                  height="20"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{ margin: 0 }}
                  colors={["#306cce", "#72a1ed"]}
                />
              </div>
            </div>

            <div className="w-full p-4  flex items-center justify-between">
              <span className="uppercase font-semibold font-poppins text-black ">
                Christian Bale
              </span>
              {/* <span className="w-10 h-10 bg-[#0047FF] flex rounded-full items-center justify-center text-white">
              <FaGoogleScholar />{" "}
            </span> */}
            </div>

            <div className="bg-[#EDF8FF] flex">
              <div className="p-5 w-full h-max  flex flex-wrap gap-5">
                {/* Implement marking questions for review */}
                {Array.from({ length: questions.length }, (_, i) => i + 1).map(
                  (number, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex justify-center items-center text-white ${getStatusClass(
                        questionStatuses[index]
                      )}`}
                      onClick={() => scrollToQuestion(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {number}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className=" bottom-0 fixed w-full h-max py-2 px-2 md:px-8 bg-white shadow-[0px_0px_6px_8px_#00000024] flex justify-between items-center">
            <div className="flex w-full px-4 gap-x-5 justify-between">
              <div className=" flex  flex-wrap gap-4  md:gap-x-5">
                <button
                  onClick={handleMarkForReview}
                  className="px-1 md:px-4 font-semibold font-poppins  text-sm border-[1px] h-max border-black py-2 rounded-lg"
                >
                  Mark for Review & Next
                </button>
                <button
                  onClick={handleClearResponse}
                  className="px-1 md:px-4 font-semibold font-poppins  text-sm border-[1px] h-max border-black py-2 rounded-lg"
                >
                  Clear Response
                </button>
              </div>
              <button
                onClick={handleSubmit}
                className="px-2 md:px-4 h-max py-2 font-semibold font-poppins text-sm bg-green-600 hover:bg-green-700 text-white  rounded-lg"
              >
                Submit
              </button>
            </div>

            <div className="flex gap-x-5">
              {/* <button className="px-6 font-semibold font-poppins text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
              Save & Exit
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseTest;
