import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Swal from "sweetalert2";

const Addiagnosistest = () => {

const baseUrl = process.env.REACT_APP_API_URL;

  // Schema for the test state
  const initialTestState = {
    title: "",
    positiveMark: "",
    negativeMark: "",
    questions: [
      {
        question: "",
        choices: [
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
        ],
        whyIsIncorrect: "",
      },
    ],
  };

  const [test, setTest] = useState(initialTestState);

  const cancelForm = () => {
    Swal.fire({
      title:
        "Do you want to cancel the changes you made,you will lose all the datas?",
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

  //   useEffect to print the test created
  useEffect(() => {
    console.log(test, "from UseEffect");
  }, [test]);

  //   Helper Function to handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   Helper Function to handle input elements in question array
  const handleQuestionInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...test.questions];
    updatedQuestions[index][name] = value;
    setTest({ ...test, questions: updatedQuestions });
  };

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

  //Helper function to add a new question array
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

  //handler funciton to submit the array
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(test);
    axios.post(`${baseUrl}api/diagnosis/create-diagnosis`);
  };

  //helper function to change the background colour of the checkbox button
  const getBackgroundColor = (isCorrect) => {
    return isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white";
  };

  return (
    <div className="flex-1 h-auto  p-5 bg-slate-200 rounded-2xl mt-5">
      <h1 className="text-2xl font-poppins font-semibold mb-5">
        Create Diagnosis Test
      </h1>

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
                className="w-full h-10 bg-white border-[2px] text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
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
                  className="w-full h-6 bg-white  text-sm rounded border-[1px] border-gray-600 shadow-lg px-3  focus:outline-blue-900"
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

        <div className="flex justify-end">
          <button
            type="button"
            onClick={addQuestion}
            className="flex gap-3 p-2 text-sm font-poppins content-center items-center rounded-lg bg-blue-900 text-white hover:bg-blue-800"
          >
            <FiPlusCircle /> Add Question
          </button>
        </div>

        <div className="flex gap-x-7 justify-center">
          <button
            className="px-12 py-2 bg-blue-600 rounded-md text-white font-poppins"
            type="button"
            onClick={cancelForm}
          >
            Cancel
          </button>
          <button
            className="px-12 py-2 bg-green-600 rounded-md text-white font-poppins"
            type="submit"
          >
            Create Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addiagnosistest;
