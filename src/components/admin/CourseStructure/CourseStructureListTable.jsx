import React, { useEffect } from "react";
import Loader from "../../reusable/Loader";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const CourseStructureListTable = ({
  data,
  isPending,
  currentPage,
  pageSize,
}) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  const columns = [
    { field: "serialNumber", headerName: "Sl.No." },
    { field: "courseName", headerName: "Course Name" },
    { field: "description", headerName: "Description" },
    { field: "groupCourse", headerName: "Group Course" },
    { field: "individualCourse", headerName: "Individual Course" },
    { field: "modules", headerName: "No. of Modules" },
    { field: "package", headerName: "Package" },
    { field: "price", headerName: "Price" },
    { field: "trainingDuration", headerName: "Training Duration" },
    { field: "createdAt", headerName: "Created At" },
    { field: "updatedAt", headerName: "Updated At" },
    { field: "edit", headerName: "Edit" },
  ];

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedDate = new Date(date).toLocaleString("en-IN", options);
    return formattedDate;
  };

  return (
    <div className="w-full pr-3 flex items-center justify-center">
      <div className="table-container">
        <table className="responsive-table">
          <thead className="sticky z-1 top-0 bg-white">
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
              data?.map((item, indexrow) => (
                <tr key={indexrow}>
                  {columns.map((column, index) => (
                    <td key={index}>
                      {column.field === "serialNumber" ? (
                        <div className="text-center">
                          {(currentPage - 1) * pageSize + (indexrow + 1)}
                        </div>
                      ) : null}

                      {column.field === "courseName" ? (
                        <div className="flex items-center justify-center">
                          <h1
                            data-tooltip-id={`courseName-${indexrow}`}
                            data-tooltip-content={item.courseName}
                            className="w-[90%] line-clamp-1 text-center uppercase"
                          >
                            {item.courseName}
                          </h1>
                          <Tooltip
                            id={`courseName-${indexrow}`}
                            place="top"
                            type="dark"
                            effect="solid"
                          />
                        </div>
                      ) : null}

                      {column.field === "description" ? (
                        <div className="flex items-center justify-center">
                          <h1
                            data-tooltip-id={`description-${indexrow}`}
                            data-tooltip-content={item.description}
                            className="w-[90%] line-clamp-1 text-center"
                          >
                            {item.description}
                          </h1>
                          <Tooltip
                            id={`description-${indexrow}`}
                            place="top"
                            type="dark"
                            effect="solid"
                          />
                        </div>
                      ) : null}

                      {column.field === "groupCourse" ? (
                        <div className="text-center">
                          {item.groupCourse ? "Yes" : "No"}
                        </div>
                      ) : null}

                      {column.field === "individualCourse" ? (
                        <div className="text-center">
                          {item.individualCourse ? "Yes" : "No"}
                        </div>
                      ) : null}

                      {column.field === "modules" ? (
                        <div className="text-center">{item.modules.length}</div>
                      ) : null}

                      {column.field === "package" ? (
                        <div className="text-center">{item.package}</div>
                      ) : null}

                      {column.field === "price" ? (
                        <div className="text-center">{item.price}</div>
                      ) : null}

                      {column.field === "trainingDuration" ? (
                        <div className="text-center">
                          {item.trainingDuration}
                        </div>
                      ) : null}

                      {column.field === "createdAt" ? (
                        <span className="text-center">
                          {formatDate(item[column.field])}
                        </span>
                      ) : null}

                      {column.field === "updatedAt" ? (
                        <span className="text-center">
                          {formatDate(item[column.field])}
                        </span>
                      ) : null}

                      {column.field === "edit" ? (
                        <Link
                          to={`/admin/home/coursestructure/editcoursestructure/${item._id}`}
                        >
                          <span className="border-[1px] w-full px-2 bg-[#0066DE] text-white cursor-pointer flex justify-center items-center">
                            Edit
                          </span>
                        </Link>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseStructureListTable;
