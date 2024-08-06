import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./QuestionBank.css";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../../reusable/BackButton";
import ViewModal from "./ViewModal";
import Loader from "../../reusable/Loader";


const QuestionBank = () => {


  const [Modal, setModal] = useState(false)
  const [Data, setdata] = useState(null)

  // function to open the modal
  const handleView = (data) => {
    console.log("open modal function clicked");
    setdata([data]);
    console.log(data)
    setModal(true);
  };

// Query funciton to fetch all the course tests
  const fetchQuestions = async () => {
    const response = await AdminAxiosInstance.get("api/test/course-tests?page=1&pageSize=&search=")
    console.log(response.data.data)
    return response.data.data

  }

// UseQuery function
  const { data, isPending } = useQuery({
    queryKey: ["fetchAllTests"],
    queryFn: fetchQuestions,
    staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Data remains in cache for 10 minutes
  });

  const best = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },

  ];
  const least = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },

  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  return (
    <div className="font-poppins w-full   h-max flex flex-row-reverse justify-left items-left relative ">

      {/* Modal for viewing the list of questions */}
      {Modal === true && <ViewModal setModal={setModal} Data={Data} />}


      {/* Aside Bar Starts Here*/}
      <div className="w-[320px] h-max  flex-col justify-center items-center  pl-4 gap-2 font-poppins border-l border-black hidden lg:block">
        <div className="w-full  h-72 flex flex-col">
          <p className="text-sm font-semibold p-2">Top Performers in Tests</p>

          <div className="w-full  h-64  overflow-y-scroll no-scrollbar ">
            {best.map((item, index) => (
              <div
                key={index}
                className="w-full h-max border-b-[1px] border-gray-300  flex justify-start items-start p-2"
              >
                {/* user image div  */}
                <div className="w-10 h-10 rounded-full bg-black"></div>
                <div className="w-max flex flex-col ml-2 justify-start items-start text-xs">
                  <p>{item.name}</p>{" "}
                  <p className="text-gray-500">{item.email}</p>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-8 h-72 flex flex-col">
          <p className="text-sm font-semibold p-2">Least Performing</p>
          <div className="w-full h-64 overflow-y-scroll no-scrollbar ">
            {least.map((item, index) => (
              <div
                key={index}
                className="w-[90%] h-max flex justify-start items-start p-2"
              >
                <div className="w-10 h-10 rounded-full bg-black"></div>
                <div className="w-max flex flex-col ml-2 justify-start items-start text-xs">
                  <p>{item.name}</p>{" "}
                  <p className="text-gray-500">{item.email}</p>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Body Starts */}
      <div className="flex-1 flex flex-col  ">
        <p className="text-base lg:text-lg font-semibold p-2">Tests</p>

        <div className="w-full h-max flex ">
          <div className="w-full lg:w-full h-full flex flex-col p-2">
            <div className="w-full h-max  bg-white  flex justify-between items-center text-xs md:text-[14px] rounded-lg py-2 ">

              <input
                type="text"
                placeholder="Search For Student"
                className="w-full p-2 border-2 outline-none mr-2 "
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="p-1 w-max text-[10px] md:text-xs bg-blue-600 text-white rounded-lg flex gap-2 justify-center items-center">
                <CiSearch className="w-5 h-5 lg:w-8 lg:h-8" />
                <p className="w-20">Show Results</p>
              </button>
            </div>
            {/*Table Starts Here*/}

            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Positive Mark</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Negative Mark</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Total Questions</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isPending ? (
                    <tr>
                      <td colSpan="6" className="p-4 h-36 ">
                        <Loader />
                      </td>
                    </tr>
                  ) : (
                    data?.map((item, index) => (
                      <tr key={item._id}>
                        <td className="p-2 whitespace-nowrap">{index + 1}</td>
                        <td className="p-2 whitespace-nowrap">{item.title}</td>
                        <td className="p-2 whitespace-nowrap hidden sm:table-cell">{item.positiveMark}</td>
                        <td className="p-2 whitespace-nowrap hidden md:table-cell">{item.negativeMark}</td>
                        <td className="p-2 whitespace-nowrap hidden lg:table-cell">{item.questions.length}</td>
                        <td className="p-2 flex gap-2 flex-wrap">
                          <button className="px-2 py-1 text-xs border border-black rounded-md mr-2">Review</button>
                          <button
                            onClick={() => handleView(item)}
                            className="px-2 py-1 text-xs border border-black rounded-md mr-2">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>


        </div>

      </div>

    </div>
  );
};

export default QuestionBank;

