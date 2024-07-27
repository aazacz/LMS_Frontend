import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { TutorAxiosInstance } from '../../routes/TutorRoutes';

const AddTest = () => {
    const baseURL = process.env.REACT_APP_API_URL;
    const { courseId } = useParams();
    const tutorId = '66502aa8a14e7b5357e068ec';

    const initialTestState = {
        tutorId: tutorId,
        courseId: courseId,
        title: '',
        positiveMark: '',
        negativeMark: '',
        questions: [
            {
                question: '',
                choices: [
                    { choiceText: '', isCorrect: false },
                    { choiceText: '', isCorrect: false },
                    { choiceText: '', isCorrect: false },
                    { choiceText: '', isCorrect: false },
                ],
                whyIsIncorrect: '',
            },
        ],
        timeSlot: '',
    };

    const [test, setTest] = useState(initialTestState);

    useEffect(() => {
        console.log(test);
    }, [test]);

    const cancelForm = () => {
        Swal.fire({
            title: 'Do you want to cancel the changes you made? You will lose all the data.',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setTest(initialTestState);
                Swal.fire('Cleared', '', 'success');
            }
        });
    };

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

    const handleIsCorrectChange = (questionIndex, choiceIndex) => {
        const updatedQuestions = [...test.questions];
        updatedQuestions[questionIndex].choices.forEach((choice, index) => {
            choice.isCorrect = index === choiceIndex;
        });
        setTest({ ...test, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setTest((prevState) => ({
            ...prevState,
            questions: [
                ...prevState.questions,
                {
                    question: '',
                    choices: [
                        { choiceText: '', isCorrect: false },
                        { choiceText: '', isCorrect: false },
                        { choiceText: '', isCorrect: false },
                        { choiceText: '', isCorrect: false },
                    ],
                    whyIsIncorrect: '',
                },
            ],
        }));
    };

    const validateTest = (test) => {
        if (!test.title || !test.title.trim()) return false;
        if (!test.positiveMark || isNaN(test.positiveMark)) return false;
        if (!test.negativeMark || isNaN(test.negativeMark)) return false;
        if (!test.timeSlot) return false;

        for (let question of test.questions) {
            if (!question.question || !question.question.trim()) return false;
            if (question.choices.length !== 4) return false;
            for (let choice of question.choices) {
                if (!choice.choiceText || !choice.choiceText.trim()) return false;
            }
        }

        return true;
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!validateTest(test)) {
            Swal.fire('Validation Error', 'Please fill all required fields correctly', 'error');
            return;
        }
        console.log('Validated data:', test);
        try {
            const response = await TutorAxiosInstance.post(`api/test/course-tests`, test);
            if (response.data.success) {
                setTest(initialTestState);
                Swal.fire('Test created successfully', '', 'success');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                Swal.fire('Error creating test', error.response.data.message || error.message, 'error');
            } else if (error.request) {
                console.error('Error request:', error.request);
                Swal.fire('Error creating test', 'No response from server', 'error');
            } else {
                console.error('Error message:', error.message);
                Swal.fire('Error creating test', error.message, 'error');
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

    const handleDurationChange = (e) => {
        setTest((prevState) => ({
            ...prevState,
            timeSlot: e.target.value,
        }));
    };

    const getBackgroundColor = (isCorrect) => {
        return isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
    };

    return (
        <div className="flex-1 h-auto p-5 bg-slate-200 rounded-2xl mt-5">
            <h1 className="text-2xl font-poppins font-semibold mb-5">Create Course Test</h1>
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

                <select
                        id="timeSlot"
                        value={test.timeSlot} // Bind value to state
                        onChange={handleDurationChange}
                        className="w-full h-10 bg-white border-[2px] text-sm rounded shadow-lg px-3 mt-2  focus:outline-blue-900"
                    >
                        <option defaultChecked disabled value="">
                                Select a course type
                            </option>
                       
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


                {test.questions.map((question, qIndex) => (
                    <div key={qIndex} className="w-full h-auto bg-white rounded-lg p-4 flex flex-col gap-y-4 border-2 border-blue-900 mt-4">
                        <div className="w-full">
                            <label className="text-sm font-semibold">Question {qIndex + 1}</label>
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
                            <div key={cIndex} className={`flex items-center gap-x-2 px-2 rounded-md`}>
                                <input
                                    name="choiceText"
                                    value={choice.choiceText}
                                    onChange={(e) => handleChoiceInputChange(e, qIndex, cIndex)}
                                    type="text"
                                    placeholder={`Choice ${cIndex + 1}`}
                                    className="w-full h-9 bg-white text-sm rounded border-[1px] border-gray-600 shadow-lg px-3 focus:outline-blue-900"
                                />
                                <div
                                    onClick={() => handleIsCorrectChange(qIndex, cIndex)}
                                    className={`flex w-20 h-9 items-center cursor-pointer justify-center text-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${getBackgroundColor(choice.isCorrect)} px-2 rounded-sm`}
                                >
                                    {choice.isCorrect ? 'True' : 'False'}
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

export default AddTest;
