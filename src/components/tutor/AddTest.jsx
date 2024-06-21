import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const AddTest = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { courseId } = useParams(); 
  const tutorId = "66502aa8a14e7b5357e068ec"; 

  // Schema for the test state
  const initialTestState = {
    tutorId: tutorId,
    courseId: courseId,
    title: "",
    positiveMark: "",
    negativeMark: "",
    questions: [
      {
        question: "",
        choices: [
          { choiceText: "", isCorrect: true },
          { choiceText: "", isCorrect: true },
          { choiceText: "", isCorrect: true },
          { choiceText: "", isCorrect: true },
        ],
        whyIsIncorrect: "",
      },
    ],
    timeSlot: "",
  };

  const [test, setTest] = useState(initialTestState);

  

  //cancel
  const cancelForm = () => {
    Swal.fire({
      title:
        "Do you want to cancel the changes you made, you will lose all the data?",
      showDenyButton: true,

      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setTest(initialTestState);
        Swal.fire("Cleared", "", "success");
      }
    });
  };

  // useEffect(() => {
  //   console.log(test, "from UseEffect");
  // }, [test]);

  
  //concatenate questions
  const handleQuestionInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...test.questions];
    updatedQuestions[index][name] = value;
    setTest({ ...test, questions: updatedQuestions });
  };


  //choices
  const handleChoiceInputChange = (e, questionIndex, choiceIndex) => {
    const { name, value } = e.target;

    const updatedQuestions = [...test.questions];
    updatedQuestions[questionIndex].choices[choiceIndex][name] = value;
    setTest({ ...test, questions: updatedQuestions });
  };

  //handle correct and incorrect answers
  const handleIsCorrectChange = (e, questionIndex, choiceIndex) => {
    const { checked } = e.target;
    console.log(checked);
    const updatedQuestions = [...test.questions];
    updatedQuestions[questionIndex].choices[choiceIndex].isCorrect = !checked;
    setTest({ ...test, questions: updatedQuestions });
    getBackgroundColor();
  };


  //to add another question
  const addQuestion = () => {
    setTest((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          question: "",
          choices: [
            { choiceText: "", isCorrect: true },
            { choiceText: "", isCorrect: true },
            { choiceText: "", isCorrect: true },
            { choiceText: "", isCorrect: true },
          ],
          whyIsIncorrect: "",
        },
      ],
    }));
  };
  
  //validate if all the fields are filled
  const validateTest = (test) => {
    if (!test.title || !test.title.trim()) { // Check for empty or whitespace-only title
      return false;
    }
    if (!test.positiveMark || isNaN(test.positiveMark)) { // Check for valid number in positiveMark
      return false;
    }
    if (!test.negativeMark || isNaN(test.negativeMark)) { // Check for valid number in negativeMark
      return false;
    }
    if (!test.timeSlot) { // Check for existence of timeslot
      return false;
    }
  
    for (let question of test.questions) {
      if (!question.question || !question.question.trim()) { // Check for empty or whitespace-only question
        return false;
      }
      if (question.choices.length !== 4) { // Check for exactly 4 choices
        return false;
      }
      for (let choice of question.choices) {
        if (!choice.choiceText || !choice.choiceText.trim()) { // Check for empty or whitespace-only choice text
          return false;
        }
      }
    }
  
    return true;
  };
  //submisson of the test
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateTest(test)) {
      Swal.fire(
        "Validation Error",
        "Please fill all required fields correctly",
        "error"
      );
      return;
    }
    console.log("Validated data:", test);
    try {
      const response = await axios.post(
        `${baseURL}api/diagnosis/create-course-test`,
       test
      );
      // console.log("Test created successfully:", response.data);
      setTest(initialTestState);
      Swal.fire("Test created successfully", "", "success");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        Swal.fire(
          "Error creating test",
          error.response.data.message || error.message,
          "error"
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        Swal.fire("Error creating test", "No response from server", "error");
      } else {
        console.error("Error message:", error.message);
        Swal.fire("Error creating test", error.message, "error");
      }
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const durationMap = {
    "15 min": 15,
    "30 min": 30,
    "45 min": 45,
    "1 hour": 60,
    "1.5 hour": 90,
    "2 hour": 120,
  };
  
  const handleDurationChange = (e) => {
    setTest((prevState) => ({
      ...prevState,
      timeSlot: e.target.value, // Still store the displayed value for frontend
      actualDuration: durationMap[e.target.value], // Store actual minutes for backend
    }));
  };
  //background for true/false
  const getBackgroundColor = (isCorrect) => {
    return isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white";
  };

  return (
    <div className="flex-1 h-auto  p-5 bg-slate-200 rounded-2xl mt-5">
      <div className="w-full flex justify-between flex-wrap">
        <h1 className="text-2xl font-poppins font-semibold mb-5">
          Create Test
        </h1>
        <div className="flex flex-col gap-2 w-[100%]  md:w-[50%] lg:w-[30%] py-2 font-poppins text-sm ">
          <p className="text-sm md:text-base font-semibold">
            Add Bulk Questionnaire
          </p>
          <input
            type="file"
            className="w-[90%] text-sm"
            name="file"
            accept=".docx,.doc,.pdf"
            placeholder="Select"
          />
          <p className="text-red-500 text-xs">The file must be pdf or doc*</p>
          <div className="flex gap-2 text-xs md:text-sm flex-wrap">
            <button className="px-2 md:px-4 py-2 bg-green-400 rounded-lg text-black font-semibold">
              Upload
            </button>
            <button className="px-2 md:px-4 py-2 bg-blue-700 rounded-lg text-white font-semibold">
              Download Template
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm font-semibold">Title</label>
            <input
              name="title"
              value={test.title}
              onChange={handleInputChange}
              type="text"
              placeholder="Title"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="text-sm font-semibold">Positive Mark</label>
            <input
              name="positiveMark"
              value={test.positiveMark}
              onChange={handleInputChange}
              type="number"
              placeholder="Positive Mark"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="text-sm font-semibold">Negative Mark</label>
            <input
              name="negativeMark"
              value={test.negativeMark}
              onChange={handleInputChange}
              type="number"
              placeholder="Negative Mark"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
          </div>
        </div>

        {test.questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="w-full h-auto bg-white rounded-lg p-4 flex flex-col gap-y-4 border-2 border-blue-900 mt-4"
          >
            <div className="w-full">
              <label className="text-sm font-semibold">
                Question {qIndex + 1}
              </label>
              <input
                name="question"
                value={question.question}
                onChange={(e) => handleQuestionInputChange(e, qIndex)}
                type="text"
                placeholder="Input your question"
                className="w-full h-10 bg-white border-[2px] text-sm rounded shadow-lg px-3 mt-2  focus:outline-blue-900"
              />
            </div>

            {question.choices.map((choice, cIndex) => (
              <div
                key={cIndex}
                className={`flex items-center gap-x-2 px-2 rounded-md  `}
              >
                <input
                  name="choiceText"
                  value={choice.choiceText}
                  onChange={(e) => handleChoiceInputChange(e, qIndex, cIndex)}
                  type="text"
                  placeholder={`Choice ${cIndex + 1}`}
                  className="w-full h-10 bg-white border-[2px] text-sm rounded shadow-lg px-3 mt-2  focus:outline-blue-900"
                />
                <div
                  className={`flex w-20  justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${getBackgroundColor(
                    choice.isCorrect
                  )} px-2 rounded-sm `}
                >
                  <input
                    className="w-[20%] "
                    type="checkbox"
                    onChange={(e) => handleIsCorrectChange(e, qIndex, cIndex)}
                  />
                  <label className="w-[90%] text-right font-light font-plusjakartasans text-sm ">
                    {choice.isCorrect ? "True" : "False"}
                  </label>
                </div>
                
              </div>
              
            ))}
            <div className="w-full">
              <label className="text-sm font-semibold">Why is Incorrect</label>
              <textarea
                name="whyIsIncorrect"
                value={question.whyIsIncorrect}
                onChange={(e) => handleQuestionInputChange(e, qIndex)}
                placeholder="Explanation"
                className="w-full md:h-20 rounded mt-2 shadow-lg p-2"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="text-white bg-green-600 hover:bg-green-700 rounded-lg p-2 mt-4"
        >
          <FiPlusCircle className="inline-block mr-1" />
          Add Question
        </button>
        <div>
          <label
            htmlFor="timeSlot"
            className="block text-sm font-medium text-gray-700"
          >
            Duration
          </label>
          <select
            id="timeSlot"
            value={test.timeSlot} // Bind value to state
            onChange={handleDurationChange}
            className="w-full h-10 bg-white border-[2px] text-sm rounded shadow-lg px-3 mt-2  focus:outline-blue-900"
          >
            <option className="h-max" value="15">
              15 minutes
            </option>
            <option className="h-max" value="30">
              30 minutes
            </option>
            <option className="h-max" value="45">
              45 minutes
            </option>
            <option className="h-max" value="60">
              1 hour
            </option>
            <option className="h-max" value="90">
              1.5 hours
            </option>
            <option className="h-max" value="120">
              2 hours
            </option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={cancelForm}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-4 ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTest;
