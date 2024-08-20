import React, { useState, useEffect } from "react";
import Loader from "../../reusable/Loader";
import "./StudentListTable.css";

const StudentListTable = ({
  data,
  isPending,
  handlePaymentStatus,
  setpaymentpayload,
  paymentpayload,
  handleUnPaidStatus,
  handlePayment,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setpaymentpayload((paymentpayload) => ({
      ...paymentpayload,
      [name]: value,
    }));
  };

  const columns = [
    { field: "Name", headerName: "Name" },
    { field: "number", headerName: "Number" },
    { field: "courseType", headerName: "courseType" },
    { field: "courseName", headerName: "Course Name" },
    { field: "payStatus", headerName: "Pay Status" },
    { field: "date", headerName: "Date" },
    { field: "paymentMode", headerName: "Payment Mode" },
    { field: "paymentId", headerName: "paymentId" },
    { field: "amount", headerName: "amount" },
    { field: "package", headerName: "package" },
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

    return new Date(date).toLocaleString("en-IN", options);
  };

  const handleMarkPaid = (row) => {
    if (
      paymentpayload.paymentMode &&
      paymentpayload.paymentId &&
      paymentpayload.amount
    ) {
      handlePaymentStatus(row.studentId, row.courseId);
    } else {
      alert("Please fill in all payment details.");
    }
  };

  return (
    <div className="w-full">
      <div className="table-container">
        {isPending ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <table className="responsive-table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((row, indexrow) => (
                <tr key={indexrow}>
                  {columns.map((column, index) => (
                    <td key={index}>
                      {column.field === "Name" ? (
                        <div className="font-semibold text-left">
                          {row.name}
                        </div>
                      ) : null}

                      {column.field === "email" ? (
                        <div className="font-semibold text-center">
                          {row.email}
                        </div>
                      ) : null}

                      {column.field === "number" ? (
                        <div className="font-semibold text-center">
                          {row.number}
                        </div>
                      ) : null}

                      {column.field === "courseType" ? (
                        <div className="font-semibold text-center">
                          {row.courseType}
                        </div>
                      ) : null}

                      {column.field === "courseName" ? (
                        <div className="font-semibold text-center">
                          {row.courseName}
                        </div>
                      ) : null}

                      {column.field === "payStatus" ? (
                        <div
                          className={`font-semibold text-center ${
                            row.payStatus === "Completed"
                              ? "bg-green-500 px-2"
                              : "bg-orange-500"
                          }`}
                        >
                          {row.payStatus}
                        </div>
                      ) : null}

                      {column.field === "paymentMode" ? (
                        <div className="font-semibold text-center">
                          {row.paymentMode || (
                            <input
                              className="w-[80px]"
                              type="text"
                              name="paymentMode"
                              value={paymentpayload?.paymentMode || ""}
                              onChange={(e) => handleChange(e, "paymentMode")}
                            />
                          )}
                        </div>
                      ) : null}

                      {column.field === "paymentId" ? (
                        <div className="font-semibold text-center">
                          {row.paymentId || (
                            <input
                              name="paymentId"
                              className="w-[80px]"
                              type="text"
                              value={paymentpayload?.paymentId || ""}
                              onChange={(e) =>
                                handleChange(e, row._id, "paymentId")
                              }
                            />
                          )}
                        </div>
                      ) : null}

                      {column.field === "amount" ? (
                        <div className="font-semibold text-center">
                          {row.amount ? (
                            `${row.amount} ₹`
                          ) : (
                            <input
                              name="amount"
                              className="w-[80px] no-arrow"
                              type="number"
                              value={paymentpayload?.amount || ""}
                              onChange={(e) =>
                                handleChange(e, row._id, "amount")
                              }
                            />
                          )}
                        </div>
                      ) : null}

                      {column.field === "package" ? (
                        <div className="font-semibold text-center">
                          {row.package}
                        </div>
                      ) : null}

                      {column.field === "createdAt" ? (
                        <span className="action-container text-sm font-semibold">
                          {formatDate(row[column.field])}
                        </span>
                      ) : null}

                      {column.field === "No of Modules" ? (
                        <div className="action-container">
                          <div className="font-poppins text-sm cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                            {row.modules.length}
                          </div>
                        </div>
                      ) : null}

                      {column.field === "date" ? (
                        <div className="action-container">
                          <div className="font-poppins text-sm cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                            {formatDate(row.date)}
                          </div>
                        </div>
                      ) : null}

                      {column.field === "Action" ? (
                        <div>
                          {row.payStatus === "Completed" ? (
                            <button
                              onClick={(e) => handlePayment(e, row)}
                              className="cursor-pointer bg-gray-300 text-black w-[70px] h-max"
                            >
                              Paid
                            </button>
                          ) : (
                            <button
                              onClick={(e) => handlePayment(e, row)}
                              className="bg-blue-700 text-white w-[70px] h-max"
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentListTable;
