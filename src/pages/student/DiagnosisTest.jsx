import React, { useState, useEffect } from "react";
// import { FaGoogleScholar } from "react-icons/fa";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";
import Loader from "../../components/reusable/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import "./DiagnosisTest.css";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { axiosInstanceStudent } from "../../routes/UserRoutes";

const DiagnosisTest = () => {
  const [fontSize, setFontSize] = useState(15);
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questionStatuses, setQuestionStatuses] = useState({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axiosInstanceStudent.get(
          `/api/diagnosis/diagnosis-test-active`
        );
        const positiveMark = data.positiveMark;
        const negativeMark = data.negativeMark;
        const data = response?.data;
        if (data && data.questions && Array.isArray(data.questions)) {
          const formattedQuestions = data.questions.map((question) => ({
            positiveMark: positiveMark,
            negativeMark: negativeMark,
            text: question.question,
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
        console.log("Error fetching data", error);
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

  useEffect(() => {
    // Function to handle visibility change (tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden && document.fullscreenElement) {
        let count = tabSwitchCount + 1;
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

  const handleTestExit = (message) => {
    Swal.fire({
      title: "Test Exit",
      text: message,
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/diagnosistest/result");
    });
  };

  const handleSubmit = () => {
    Swal.fire({
      title:
        "Do you want to submit the answers? You will not be able to continue this later.",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        confirmButton: "my-confirm-button",
        denyButton: "my-deny-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Submitted!",
            text: "Your answers have been submitted successfully.",
            customClass: {
              confirmButton: "my-toast-confirm-button",
            },
          });
          navigate("students/diagnosistest/result");
        }, 3000);
      }
    });
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
    const updatedAnswers = { ...selectedAnswers };
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    console.log(selectedOption);
    console.log(currentQuestion);
    const selectedOption = currentQuestion.options[optionIndex];
    console.log(selectedOption);
    updatedAnswers[currentQuestionIndex] = {
      selectedOptionIndex: optionIndex,
      isCorrect: selectedOption.isCorrect,
      whyIsIncorrect: selectedOption.isCorrect
        ? ""
        : selectedOption.whyIsIncorrect,
    };
    setSelectedAnswers(updatedAnswers);

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
      {loading && (
        <div className="absolute w-full h-screen bg-black bg-opacity-35 z-[99] flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="w-screen h-screen relative">
        <div className="Test absolute w-full h-full flex flex-wrap flex-row-reverse  overflow-y-scroll ">
          {/* Right Component */}
          <div className="flex-1 max-w-[350px] bg-[#EDF8FF] h-screen  mb-40 border-l-2">
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

            <div className="w-[full] bg-[#EDF8FF] flex">
              <div className="p-5 w-full h-max justify-between grid grid-flow-row grid-cols-5 gap-5">
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

          {/* Left Component */}
          <div className=" w-full flex-1   p-5 h-full">
            <div className="w-full">
              <h2 className="font-semibold flex justify-center items-center font-poppins text-sm text-red-800">
                Switching Tabs will lead to automatic exit
              </h2>
              <h1 className="font-semibold font-poppins text-lg">
                Diagnosis Test
              </h1>
            </div>

            <div className="pl-5 mt-5">
              <div className="w-full bg-gray-200 h-10 relative flex justify-between pl-10 items-center pr-4">
                <div className="absolute left-0 z-10 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full z-20 bg-black text-white flex items-center justify-center">
                    {currentQuestionIndex + 1}
                  </div>
                  <div className="w-6 h-6 transform rotate-45 bg-black -ml-[22px] z-10"></div>
                </div>
                <h1 className="font-poppins font-semibold text-xs">
                  Single Answer :Correct {currentQuestion?.positiveMark}M Wrong
                  -{currentQuestion?.negativeMark}M
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

          <div className="absolute bottom-0 w-full h-24 px-8 bg-white shadow-[0px_0px_6px_8px_#00000024] flex justify-between items-center">
            <div className="flex w-full gap-x-5 justify-between">
              <div className=" flex gap-x-5">
                <button
                  onClick={handleMarkForReview}
                  className="px-4 font-semibold font-poppins  text-sm border-[1px] border-black py-2 rounded-lg"
                >
                  Mark for Review & Next
                </button>
                <button
                  onClick={handleClearResponse}
                  className="px-2 font-semibold font-poppins text-sm border-[1px] border-black py-2 rounded-lg"
                >
                  Clear Response
                </button>
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 font-semibold font-poppins text-sm bg-green-600 hover:bg-green-700 text-white py-1 rounded-lg"
              >
                Submit
              </button>
            </div>

            <div className="flex gap-x-5">
              {/* <button className="px-6 font-semibold font-poppins text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
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

export default DiagnosisTest;
