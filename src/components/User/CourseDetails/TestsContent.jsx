import React, { useEffect, useState } from "react";
import usePaginationData from "./usePaginationData";
import ReusablePagination from "../../reusable/ReusablePagination";
import Loader from "../../reusable/Loader";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TestsContent = ({ enrolled }) => {
  return (
    <>
      {enrolled === "true" ? (
        <TestCompoenent />
      ) : (
        <div className="w-full h-full border-t-2 p-4">
          <h2 className="text-lg font-bold mb-2">Tests and Assessments</h2>
          <p>
            This course includes several tests and assessments to evaluate your
            understanding of the material. These assessments will help you
            identify areas where you need to focus more. The tests include:
          </p>
          <ul className="list-disc ml-5">
            <li>Weekly quizzes</li>
            <li>Mid-term examination</li>
            <li>Final examination</li>
            <li>Practical assignments and projects</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TestsContent;

//Test Component
const TestCompoenent = () => {
  const navigate = useNavigate();

  const { courseId } = useParams();
  const [Loading, setLoading] = useState(false);

  const handleTestStart = async (e, row) => {
    e.preventDefault();
    console.log("tdjy");
    console.log(row);
    console.log("tdjy");
    console.log(row._id);

    try {
      setLoading(true);
      const response = await axiosInstanceStudent.get(
        `api/test/course-tests/${row._id}`,
      );
      console.log(response.data);
      if (response.data) {
        navigate(`/student/courses/test/${response.data._id}/instructions`, {
          state: {
            courseType: "test",
            course: response.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "title", headerName: "Title" },
    { field: "tutor", headerName: "Tutor" },
    { field: "positiveMark", headerName: "Positive Mark" },
    { field: "negativeMark", headerName: "Negative Mark" },
    { field: "questionsLength", headerName: "No of Questions" },
    { field: "timeSlot", headerName: "Duration" },
    { field: "Action", headerName: "Action" },
  ];

  const formatDate = (date) => {
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedDate = new Date(date).toLocaleString("en-IN", options);
    return formattedDate;
  };

  const {
    courses,
    isPending,
    isError,
    currentPage,
    pageSize,
    totalRows,
    searchQuery,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    error,
  } = usePaginationData();

  return (
    <div className="w-full  h-max">
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              courses?.map((row, indexrow) => (
                <tr key={indexrow}>
                  {console.log(row)}
                  {columns.map((column, index) => (
                    <td key={index}>
                      {column.field === "title" ? (
                        <div className="font-semibold text-left">
                          {row.title}
                        </div>
                      ) : null}

                      {column.field === "positiveMark" ? (
                        <div className="font-semibold text-center">
                          {row.positiveMark}
                        </div>
                      ) : null}

                      {column.field === "negativeMark" ? (
                        <div className="font-semibold text-center">
                          {row.negativeMark}
                        </div>
                      ) : null}

                      {column.field === "tutor" ? (
                        <span className="action-container text-sm font-semibold">
                          {indexrow + 1}
                        </span>
                      ) : null}

                      {column.field === "timeSlot" ? (
                        <span className="action-container text-sm font-semibold">
                          {row.timeSlot}
                        </span>
                      ) : null}

                      {column.field === "questionsLength" ? (
                        <span className="action-container text-center text-sm font-semibold">
                          {row.questionsLength}
                        </span>
                      ) : null}

                      {column.field === "Action" ? (
                        <span className="action-container text-sm font-semibold">
                          <button
                            onClick={(e) => {
                              handleTestStart(e, row);
                            }}
                            className="w-[90%] h-[23px] bg-green-700 
                                                            text-sm text-white font-Roboto font-light "
                          >
                            Start
                          </button>
                        </span>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ReusablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalRows={totalRows}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};
