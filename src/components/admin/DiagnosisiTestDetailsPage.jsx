import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";

const DiagnosisiTestDetailsPage = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [data, setdata] = useState([]);
  const { diagnosisTestDetailsPage } = useParams();
  const navigate = useNavigate();
  console.log({ diagnosisTestDetailsPage });
  useEffect(() => {
    AdminAxiosInstance.get(
      `api/diagnosis/diagnosis-tests/${diagnosisTestDetailsPage}`,
    ).then((res) => {
      console.log("res.data from the Diagnosis test page");
      console.log(res.data);
      setdata([res.data]);
    });
  }, []);

  return (
    <div className="w-full container h-screen overflow-y-auto mx-auto p-4 flex flex-col ">
      <div className="flex justify-end">
        <button
          className="w-fit  p-2 bg-slate-400 rounded-md text-white"
          onClick={() => {
            navigate(
              `/admin/home/diagnosistest/edit/${diagnosisTestDetailsPage}`,
            );
          }}
        >
          Edit
        </button>
      </div>
      {data.map((test, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{test.title}</h2>
          <div className="w-full overflow-x-auto overflow-y-auto">
            <table className="table-auto w-full text-left border-collapse border  border-gray-400">
              <thead>
                <tr className="">
                  <th className="border text-white w-[5%] bg-[#00729c] border-gray-300 px-4 py-2">
                    Sl No
                  </th>
                  <th className="border text-white w-[50%] bg-[#00729c] border-gray-300 px-4 py-2">
                    Question
                  </th>
                  <th className="border text-white w-[15%] bg-[#00729c] border-gray-300 px-4 py-2">
                    Choices
                  </th>
                  <th className="border text-white w-[35%] bg-[#00729c] border-gray-300 px-4 py-2">
                    Explanation
                  </th>
                </tr>
              </thead>
              <tbody>
                {test.questions.map((question, qIndex) => (
                  <tr
                    key={qIndex}
                    className="hover:bg-gray-100 even:bg-[#dbf5ff]"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {qIndex + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.question}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul className="px-3">
                        {question.choices.map((choice, cIndex) => (
                          <li
                            key={cIndex}
                            className={` list-disc	 ${
                              choice.isCorrect
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {choice.choiceText}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {question.whyIsIncorrect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiagnosisiTestDetailsPage;
