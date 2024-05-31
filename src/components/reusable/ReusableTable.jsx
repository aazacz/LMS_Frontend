// ReusableTable.js
import React, { useState } from "react";
import { Check } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const ReusableTable = ({ columns, data, link }) => {

  const [Active, SetActive] = useState(false)

  
  const formatDate = (date) => {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    const formattedDate = new Date(date).toLocaleString('en-IN', options);
    return formattedDate;
  }



  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row,indexrow) => (
            <tr key={row._id}>
              {columns.map((column, index) => (
                
                <td key={column.field}>
                 
                 
                  {column.field === "actions" ? (
                    <div className="action-container">
                      <Check />
                      <CloseIcon onClick={() => console.log("Action clicked")} />
                    </div>
                  ) :<></>}


                  {column.field === "packageName" ? (
                    <span className="action-container text-sm font-semibold">Diagnose Test {indexrow +1}</span>
                  ) : ( <></> )}

                  {column.field === "createdAt" ? (
                    <span className="action-container text-sm font-semibold">{formatDate(row[column.field])} </span>
                  ) : ( <></> )}


                  {column.field === "button" ? (
                    <div className="action-container">
                      <div className="font-poppins text-sm  border-[1px] border-gray-500 cursor-pointer hover:bg-slate-200   flex justify-center items-center"> Review</div>

                    </div>
                  ) : (
                    <></>
                  )}
                  {column.field === "status" ? (
                    <div className="action-container">
                      {Active ? <div className="font-poppins text-sm  border-[1px] border-blue-700 bg-blue-700 text-white cursor-pointer hover:bg-slate-200   flex justify-center items-center"> Active</div>
                        : <div className="font-poppins text-sm  border-[1px] border-blue-700  cursor-pointer text-blue-700 hover:bg-slate-200   flex justify-center items-center"> Inactive</div>
                      }

                    </div>
                  ) : (
                    <>
                      {/* {row[column.field]}  */}
                    </>
                  )}

                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
