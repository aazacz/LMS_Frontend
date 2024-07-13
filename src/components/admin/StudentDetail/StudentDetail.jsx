import React, { useState } from 'react'
import { FaCalendar, FaClock } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import './StudentDetail.css'
import student from '../../../components/admin/StudentDetail/studentdetail.png'
import { FaBookOpen } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'

const StudentDetail = () => {
    const [showAllCourses, setShowAllCourses] = useState(false)
    const [showAllAssignments, setShowAllAssignments] = useState(false)

    const courses = [
        {
            title: 'SAT Math',
            days: 'Monday & Wednesday',
            time: '9:00 AM - 10:30 AM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math - ITD201',
            days: 'Tuesday & Thursday',
            time: '1:30 PM - 3:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Monday & Saturday',
            time: '11:00 AM - 12:30 AM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },
        {
            title: 'Advanced SAT Math',
            days: 'Wednesday',
            time: '2:00 PM - 5:00 PM',
            location: 'Virtual',
        },

        // Add more courses as needed
    ]

    const assignments = [
        {
            title: 'SAT ASSIGNMENT 10/10',
            assignment: 'Design Project 1',
            dueDate: 'February 10, 2024',
        },
        {
            title: 'SAT ASSIGNMENT 10/10',
            assignment: 'Responsive Website Project',
            dueDate: 'March 5, 2024',
        },
        {
            title: 'SAT LMS',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },

        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },

        {
            title: 'User Experience Research',
            assignment: 'Usability Testing Report',
            dueDate: 'April 15, 2024',
        },
        // Add more assignments as needed
    ]

    return (
        <div className="student-detail-container">
            <div className="student-detail-profile">
                <img src={student} alt="student profile" />
                <p>
                    Vidyut Jamwal
                    <br />
                    vidyutjamwal@gmail.com
                </p>
            </div>
            <div className="student-detail-courses">
                <p className="flex ">
                    <FaBookOpen className="text-2xl pr-2" /> Enrolled Courses
                </p>
                <p
                    className="flex text-[#2F80ED]"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                    style={{ cursor: 'pointer' }}
                >
                    View all
                    <IoIosArrowForward className="text-2xl pr-2" />
                </p>
            </div>
            <div className="student-detail-line"></div>
            <div className="student-detail-cards grid grid-flow-row grid-cols-1 sm:grid-cols-2 tb:grid-cols-2 tab:grid-cols-3 lg:grid-cols-4">
                {courses
                    .slice(0, showAllCourses ? courses.length : 4)
                    .map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            days={course.days}
                            time={course.time}
                            location={course.location}
                        />
                    ))}
            </div>
            <div className="student-detail-courses">
                <p className="flex ">
                    <FaBookOpen className="text-2xl pr-2" />
                    Assignments
                </p>
                <p
                    className="flex text-[#2F80ED]"
                    onClick={() => setShowAllAssignments(!showAllAssignments)}
                    style={{ cursor: 'pointer' }}
                >
                    View all
                    <IoIosArrowForward className="text-2xl pr-2" />
                </p>
            </div>
            <div className="student-detail-line"></div>
            <div className="student-detail-cards grid grid-flow-row grid-cols-1 sm:grid-cols-2 tb:grid-cols-2 tab:grid-cols-3 lg:grid-cols-4">
                {assignments
                    .slice(0, showAllAssignments ? assignments.length : 4)
                    .map((assignment, index) => (
                        <AssignmentCard
                            key={index}
                            title={assignment.title}
                            assignment={assignment.assignment}
                            dueDate={assignment.dueDate}
                        />
                    ))}
            </div>
            <div className="student-detail-courses">
                <p className="flex ">
                    <FaBookOpen className="text-2xl pr-2" />
                    Exam Board
                </p>
                <p className="flex text-[#2F80ED]">
                    View all
                    <IoIosArrowForward className="text-2xl pr-2" />
                </p>
            </div>
            <div className="student-detail-line"></div>
            <div className="exam-board-table">
                <table>
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Course</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SAT Math Fundamentals</td>
                            <td>SAT Course</td>
                            <td>Jan 25, 2024</td>
                            <td>10:00 AM</td>
                            <td>Completed</td>
                            <td>:</td>
                        </tr>
                        <tr>
                            <td>SAT Math Fundamentals</td>
                            <td>SAT Course</td>
                            <td>Jan 25, 2024</td>
                            <td>10:00 AM</td>
                            <td>Completed</td>
                            <td>:</td>
                        </tr>
                        <tr>
                            <td>SAT Math Fundamentals</td>
                            <td>SAT Course</td>
                            <td>Jan 25, 2024</td>
                            <td>10:00 AM</td>
                            <td>Completed</td>
                            <td>:</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const CourseCard = ({ title, days, time, location }) => {
    return (
        <div className="course-card  max-w-[full] md:max-w-[200px];">
            <div className="course-title">{title}</div>
            <hr className="course-divider" />
            <div className="course-details">
                <div className="detail-icon">
                    <FaCalendar />
                </div>
                <div className="detail-text">{days}</div>
            </div>
            <div className="course-details">
                <div className="detail-icon">
                    <FaClock />
                </div>
                <div className="detail-text">{time}</div>
            </div>
            <div className="course-details">
                <div className="detail-icon">
                    <FaLocationDot />
                </div>
                <div className="detail-text">{location}</div>
            </div>
        </div>
    )
}

const AssignmentCard = ({ title, assignment, dueDate }) => {
    return (
        <div className="assignment-card max-w-[full] md:max-w-[200px];">
            <div className="assignment-title">{title}</div>
            <hr className="assignment-divider" />
            <div className="assignment-details">
                <div className="detail-text">Assignment: {assignment}</div>
            </div>
            <div className="assignment-details">
                <div className="detail-text">Due Date: {dueDate}</div>
            </div>
        </div>
    )
}

export default StudentDetail
