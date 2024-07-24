import React, { useState } from 'react';
import Loader from '../../reusable/Loader';
import './StudentListTable.css'

const StudentListTable = ({ data, isPending, handlePaymentStatus, handleInput }) => {
    const [inputs, setInputs] = useState({});

    const handleChange = (e, rowId, field) => {
        setInputs({
            ...inputs,
            [rowId]: {
                ...inputs[rowId],
                [field]: e.target.value
            }
        });
    };

    const columns = [
        { field: 'Name', headerName: 'Name' },
        { field: 'number', headerName: 'Number' },
        { field: 'courseType', headerName: 'courseType' },
        { field: 'courseName', headerName: 'Course Name' },
        { field: 'payStatus', headerName: 'Pay Status' },
        { field: 'date', headerName: 'Date' },
        { field: 'paymentMode', headerName: 'Payment Mode' },
        { field: 'paymentId', headerName: 'paymentId' },
        { field: 'amount', headerName: 'amount' },
        { field: 'package', headerName: 'package' },
        { field: 'Action', headerName: 'Action' },
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

    const handleMarkPaid = (row) => {
        const paymentMode = row.paymentMode || inputs[row._id]?.paymentMode;
        const paymentId = row.paymentId || inputs[row._id]?.paymentId;
        const amount = row.amount || inputs[row._id]?.amount;

        if (paymentMode && paymentId && amount) {
            handlePaymentStatus(row.studentId, row.courseId, paymentMode, paymentId, amount);
        } else {
            alert('Please fill in all payment details.');
        }
    };

    return (
        <div className='w-full'>
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
                            <tr>
                                <td colSpan={columns.length} className="w-full h-full flex justify-center items-center">
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            data?.map((row, indexrow) => (
                                <tr key={indexrow}>
                                    {columns.map((column, index) => (
                                        <td key={index}>
                                            {column.field === 'Name' ? (
                                                <div className="font-semibold text-left">
                                                    {row.name}
                                                </div>
                                            ) : null}

                                            {column.field === 'email' ? (
                                                <div className="font-semibold text-center">
                                                    {row.email}
                                                </div>
                                            ) : null}

                                            {column.field === 'number' ? (
                                                <div className="font-semibold text-center">
                                                    {row.number}
                                                </div>
                                            ) : null}

                                            {column.field === 'courseType' ? (
                                                <div className="font-semibold text-center">
                                                    {row.courseType}
                                                </div>
                                            ) : null}

                                            {column.field === 'courseName' ? (
                                                <div className="font-semibold text-center">
                                                    {row.courseName}
                                                </div>
                                            ) : null}

                                            {column.field === 'payStatus' ? (
                                                <div
                                                    className={`font-semibold text-center ${
                                                        row.payStatus === 'Completed' ? 'bg-green-500 px-2' : 'bg-orange-500'
                                                    }`}
                                                >
                                                    {row.payStatus}
                                                </div>
                                            ) : null}

                                            {column.field === 'paymentMode' ? (
                                                <div className="font-semibold text-center">
                                                    {row.paymentMode || (
                                                        <input
                                                         className='w-[80px]'
                                                            type="text"
                                                            value={inputs[row._id]?.paymentMode || ''}
                                                            onChange={(e) => handleChange(e, row._id, 'paymentMode')}
                                                        />
                                                    )}
                                                </div>
                                            ) : null}

                                            {column.field === 'paymentId' ? (
                                                <div className="font-semibold text-center">
                                                    {row.paymentId || (
                                                        <input
                                                         className='w-[80px]'
                                                            type="text"
                                                            value={inputs[row._id]?.paymentId || ''}
                                                            onChange={(e) => handleChange(e, row._id, 'paymentId')}
                                                        />
                                                    )}
                                                </div>
                                            ) : null}

                                            {column.field === 'amount' ? (
                                                <div className="font-semibold text-center">
                                                    {row.amount ? (
                                                        `${row.amount} ₹`
                                                    ) : (
                                                        <input
                                                        className='w-[80px] no-arrow'
                                                            type="number"
                                                            value={inputs[row._id]?.amount || ''}
                                                            onChange={(e) => handleChange(e, row._id, 'amount')}
                                                        />
                                                    )}
                                                </div>
                                            ) : null}

                                            {column.field === 'package' ? (
                                                <div className="font-semibold text-center">
                                                    {row.package}
                                                </div>
                                            ) : null}

                                            {column.field === 'createdAt' ? (
                                                <span className="action-container text-sm font-semibold">
                                                    {formatDate(row[column.field])}
                                                </span>
                                            ) : null}

                                            {column.field === 'No of Modules' ? (
                                                <div className="action-container">
                                                    <div className="font-poppins text-sm cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                        {row.modules.length}
                                                    </div>
                                                </div>
                                            ) : null}

                                            {column.field === 'date' ? (
                                                <div className="action-container">
                                                    <div className="font-poppins text-sm cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                        {formatDate(row.date)}
                                                    </div>
                                                </div>
                                            ) : null}

                                            {column.field === 'Action' ? (
                                                <div>
                                                    {row.payStatus === "Completed" ? (
                                                        <button className='cursor-default bg-gray-200 text-black w-[70px] h-max'>Paid</button>
                                                    ) : (
                                                        <button onClick={() => handleMarkPaid(row)} className='bg-blue-700 text-white w-[70px] h-max'>Mark Paid</button>
                                                    )}
                                                </div>
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

export default StudentListTable;
