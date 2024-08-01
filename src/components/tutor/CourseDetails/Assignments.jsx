import React, { useState } from "react";
import usePaginationData from "./usePaginationData";
import ReusablePagination from "../../reusable/ReusablePagination";
import Loader from "../../reusable/Loader";
import AssignmentModal from "./AssignmentModal";
import { FaEye } from 'react-icons/fa'; // Import a suitable icon

const Assignments = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { field: 'slno', headerName: 'Sl No' },
    { field: 'assignmentName', headerName: 'Title' },
    { field: 'assignmentDescription', headerName: 'Description' },
    { field: 'timeSlot', headerName: 'Created At' },
    { field: 'Action', headerName: 'Action' }
  ];

  const formatDate = (date) => {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Date(date).toLocaleString('en-IN', options);
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
    error
  } = usePaginationData(courseId);

  const handleOpenModal = (assignment) => {
    setSelectedAssignmentId(assignment._id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAssignmentId(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className=" h-max">
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
                    {columns.map((column, index) => (
                      <td key={index}>
                        {column.field === 'slno' ? (
                          <div className="font-semibold text-left">
                            {indexrow + 1}
                          </div>
                        ) : null}

                        {column.field === 'assignmentName' ? (
                          <div className="font-semibold text-center">
                            {row.assignmentName}
                          </div>
                        ) : null}

                        {column.field === 'assignmentDescription' ? (
                          <div className="w-[150px] font-semibold text-center text-wrap line-clamp-1">
                            {row.assignmentDescription}
                          </div>
                        ) : null}

                        {column.field === 'timeSlot' ? (
                          <span className="action-container text-sm font-semibold">
                            {formatDate(row.timestamp)}
                          </span>
                        ) : null}

                        {column.field === 'Action' ? (
                          <span className="action-container text-sm font-semibold">
                            <button
                              onClick={() => handleOpenModal(row)}
                              className="w-[30px] h-[30px] flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-700"
                            >
                              <FaEye size={16} />
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
      {selectedAssignmentId && (
        <AssignmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          assignmentId={selectedAssignmentId}
        />
      )}
    </>
  );
};

export default Assignments;
