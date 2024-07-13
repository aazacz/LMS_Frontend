// ReusableTable.js
import React, { useState } from 'react'
import { Check } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loader from './Loader'

const ReusableTable = ({ columns, data, link, isPending }) => {
    const [Active, SetActive] = useState(false)

    console.log('data from resusable table')

    console.log(data)

    const formatDate = (date) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }

        const formattedDate = new Date(date).toLocaleString('en-IN', options)
        return formattedDate
    }

    const handleDiagnosisTestActive = (Status, blockId) => {
        if (Status === 'inactive') {
            handleActive(blockId)
        } else {
            handleUnBlock(blockId)
        }
    }

    const handleActive = async (activeId) => {
        console.log('active function hitted')
        console.log(activeId)
        try {
            await axios
                .patch(`${apiURL}api/diagnosis/active-diagnosis/${activeId}`)
                .then((response) => {
                    console.log(response)
                    if (
                        response.data.message ===
                        'Diagnosis Test activated successfully'
                    ) {
                        toast.success('Diagnosis Test activated successfully')
                        refetch()
                    }
                })
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    const handleUnBlock = async (activeId) => {
        console.log('make active function clicked')
        console.log(activeId)
        try {
            await axios
                .patch(`${apiURL}api/students/unblock-students/${activeId}`)
                .then((response) => {
                    console.log(response)
                    if (response.data.status === 'active') {
                        toast.success('Student Unblocked Successfully')
                        refetch()
                    }
                })
        } catch (error) {
            console.table(error)
            toast.error(error.response.data)
        }
    }

    return (
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
                        data?.data?.map((row, indexrow) => (
                            <tr key={indexrow}>
                                {columns.map((column, index) => (
                                    <td key={index}>
                                        {column.field === 'questions' ? (
                                            <div className="font-semibold text-center">
                                                {row.questions.length}
                                            </div>
                                        ) : null}

                                        {column.field === 'marks' ? (
                                            <div className="font-semibold text-center">
                                                {row.questions.length *
                                                    row.positiveMark}
                                            </div>
                                        ) : null}

                                        {column.field === 'packageName' ? (
                                            <Link
                                                to={`/admin/home/diagnosistest/${row._id}`}
                                            >
                                                <span className="action-container text-sm font-semibold">
                                                    Diagnose Test {indexrow + 1}
                                                </span>
                                            </Link>
                                        ) : null}

                                        {column.field === 'createdAt' ? (
                                            <span className="action-container text-sm font-semibold">
                                                {formatDate(row[column.field])}
                                            </span>
                                        ) : null}

                                        {column.field === 'button' ? (
                                            <div className="action-container">
                                                <div className="font-poppins text-sm border-[1px] border-gray-500 cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                    Review
                                                </div>
                                            </div>
                                        ) : null}

                                        {column.field === 'status' ? (
                                            <div className="action-container">
                                                {Active ? (
                                                    <div
                                                        onClick={() =>
                                                            handleDiagnosisTestActive(
                                                                'active',
                                                                row._id
                                                            )
                                                        }
                                                        className="font-poppins text-sm border-[1px] border-blue-700 bg-blue-700 text-white cursor-pointer hover:bg-slate-200 flex justify-center items-center"
                                                    >
                                                        Active
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleDiagnosisTestActive(
                                                                'inactive',
                                                                row._id
                                                            )
                                                        }
                                                        className="font-poppins text-sm border-[1px] border-blue-700 cursor-pointer text-blue-700 hover:bg-slate-200 flex justify-center items-center"
                                                    >
                                                        Inactive
                                                    </div>
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
    )
}

export default ReusableTable
