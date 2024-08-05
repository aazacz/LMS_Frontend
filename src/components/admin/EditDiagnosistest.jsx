import axios from "axios";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";
import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditDiagnosistest = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  // Schema for the test state
  const initialTestState = {
    title: "",
    positiveMark: "",
    negativeMark: "",
    paymentNeeded: false,
    paymentAmount: 0,
    questions: [
      {
        question: "",
        choices: [
          { choiceText: "", isCorrect: true },
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
        ],
        whyIsIncorrect: "",
      },
    ],
    isActive: false,
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const [test, setTest] = useState(initialTestState);
  const { testId } = useParams();
  useEffect(() => {
    fetchDiagnosistest();
  }, []);
  const fetchDiagnosistest = async () => {
    try {
      const res = await AdminAxiosInstance.get(
        "api/diagnosis/diagnosis-tests/" + testId
      );
      // if (!res.status !== 200) return navigate("/admin/home/diagnosistest");
      setTest(res.data);
      setValue("title", res.data.title);
      setValue("positiveMark", res.data.positiveMark);
      setValue("negativeMark", res.data.negativeMark);
      setValue("paymentNeeded", res.data.paymentNeeded);
      setValue("paymentAmount", res.data.paymentAmount);
    } catch (error) {
      console.log(error);
    }
  };

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

  //   Helper Function to handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ value });
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
  const handleIsCorrectChange = (choice, questionIndex, choiceIndex) => {
    console.log(choice);
    const updatedQuestions = [...test.questions];

    const correctIndex = updatedQuestions[questionIndex].choices.findIndex(
      (choice) => choice.isCorrect
    );
    console.log(correctIndex);

    if (correctIndex === -1) {
      updatedQuestions[questionIndex].choices[choiceIndex].isCorrect = true;
      setTest({ ...test, questions: updatedQuestions });
      getBackgroundColor();
    } else {
      updatedQuestions[questionIndex].choices[choiceIndex].isCorrect = true;
      updatedQuestions[questionIndex].choices[correctIndex].isCorrect = false;
      setTest({ ...test, questions: updatedQuestions });
      getBackgroundColor();
    }
  };

  //Helper function to add a new question array
  const addQuestion = () => {
    setTest((prevState) => {
      const prevQuestion = prevState.questions[prevState.questions.length - 1];
      if (
        !prevQuestion.question ||
        prevQuestion.choices.find((choice) => !choice.choiceText) ||
        !prevQuestion.whyIsIncorrect
      ) {
        toast.error("Please fill current question before adding");
        return prevState;
      }
      return {
        ...prevState,
        questions: [
          ...prevState.questions,
          {
            question: "",
            choices: [
              { choiceText: "", isCorrect: true },
              { choiceText: "", isCorrect: false },
              { choiceText: "", isCorrect: false },
              { choiceText: "", isCorrect: false },
            ],
            whyIsIncorrect: "",
          },
        ],
      };
    });
  };

  //handler funciton to submit the array
  const submitHandler = () => {
    AdminAxiosInstance.put(`api/diagnosis/diagnosis-tests/${testId}`, test)
      .then((res) => {
        console.log({ res });
        if (res.status === 200) {
          toast.success("Diagnosis test edited successfully");
          setTest(initialTestState);
          navigate("/admin/home/diagnosistest");
        }
      })
      .catch((err) => console.log(err));
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

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="flex flex-col md:flex-row md:flex-wrap items-end gap-y-4 justify-start md:space-x-4">
          <div className="w-full md:w-1/3">
            <label className="text-sm font-semibold">Title</label>
            <input
              name="title"
              value={test.title}
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 50,
                  message: "Title cannot exceed 50 characters",
                },
                minLength: {
                  value: 5,
                  message: "Title should be at least 5 characters",
                },
              })}
              onChange={handleInputChange}
              type="text"
              placeholder="Title"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/4">
            <label className="text-sm font-semibold">Positive Mark</label>
            <input
              name="positiveMark"
              value={test.positiveMark}
              {...register("positiveMark", {
                required: "Positive Mark is required",
                min: {
                  value: 0,
                  message: "Positive Mark cannot be less than 0",
                },
              })}
              onChange={handleInputChange}
              type="number"
              placeholder="Positive Mark"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
            {errors.positiveMark && (
              <p className="text-red-500 text-xs mt-1">
                {errors.positiveMark.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/4">
            <label className="text-sm font-semibold">Negative Mark</label>
            <input
              name="negativeMark"
              value={test.negativeMark}
              {...register("negativeMark", {
                required: "Negative Mark is required",
                min: {
                  value: 0,
                  message: "Negative Mark cannot be less than 0",
                },
              })}
              onChange={handleInputChange}
              type="number"
              placeholder="Negative Mark"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
            {errors.negativeMark && (
              <p className="text-red-500 text-xs mt-1">
                {errors.negativeMark.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 items-center md:w-1/4 mb-2">
            <input
              className="size-6"
              type="checkbox"
              checked={test.paymentNeeded}
              name="paymentNeeded"
              onChange={(e) => {
                setTest({
                  ...test,
                  paymentNeeded: !Boolean(test.paymentNeeded),
                });
              }}
            />
            <label className="text-sm font-semibold">
              Need to pay for test?
            </label>
          </div>
          {test.paymentNeeded && (
            <div className="w-full md:w-1/4">
              <label className="text-sm font-semibold">Payment amount</label>
              <input
                name="paymentAmount"
                defaultValue={0}
                value={test.paymentAmount}
                {...register("paymentAmount", {
                  required:
                    test.paymentNeeded === true && "Payment amount is needed",
                  min: {
                    value: 0,
                    message: "Payment amount cannot be less than 0",
                  },
                })}
                onChange={handleInputChange}
                type="number"
                placeholder="Payment amount"
                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
              />
              {errors.paymentAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.paymentAmount.message}
                </p>
              )}
            </div>
          )}
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
                  className="w-full h-9 bg-white  text-sm rounded border-[1px] border-gray-600 shadow-lg px-3  focus:outline-blue-900"
                />

                <div
                  onClick={() =>
                    handleIsCorrectChange(choice.isCorrect, qIndex, cIndex)
                  }
                  className={`flex w-20 h-9 items-center cursor-pointer  justify-center text-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${getBackgroundColor(
                    choice.isCorrect
                  )} px-2 rounded-sm `}
                >
                  {choice.isCorrect ? "True" : "False"}
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
            Edit Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDiagnosistest;
