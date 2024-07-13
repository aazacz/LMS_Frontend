import React from 'react'
import './NewCourse.css'

const NewCourse = () => {
    const courses = ['English', 'Grammar', 'Language']
    const grades = ['8', '9', '10', '11']
    const hours = ['1', '2', '3', '4', '5', '6']

    return (
        <div className="new-course-container">
            <div className="new-course">
                <p className="new-course-title">New Course</p>
                <p className="new-course-instruction">
                    Select Course you want to teach*
                </p>
                <select
                    name="course-names"
                    id="course-names"
                    className="new-course-select"
                    defaultValue=""
                >
                    <option value="" enabled>
                        Select a Course
                    </option>
                    {courses.map((course, index) => (
                        <option key={index} value={course}>
                            {course}
                        </option>
                    ))}
                </select>
                <p className="new-course-instruction">
                    Teaching Grade of Students*
                </p>
                <select
                    name="course-grade"
                    id="course-grade"
                    className="new-course-grade"
                    defaultValue=""
                >
                    <option value="" enabled>
                        Select a Grade
                    </option>
                    {grades.map((grade, index) => (
                        <option key={index} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
            </div>
            <div className="course-date-time">
                <p className="new-course-title">Training Date & Time Details</p>
                <div className="time-container">
                    <div className="new-course-duration">
                        <p className="new-course-instruction">
                            Training Duration
                        </p>
                        <input
                            type="text"
                            className="new-course-grade-duration"
                            placeholder="Select Time"
                        />
                    </div>
                    <div className="new-course-duration">
                        <p className="new-course-instruction">
                            No of Hours Per Day
                        </p>
                        <select
                            name="course-grade"
                            id="course-grade"
                            className="new-course-grade-duration"
                            defaultValue=""
                        >
                            <option value="" enabled>
                                Select Hours
                            </option>
                            {hours.map((hour, index) => (
                                <option key={index} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="day-container">
                    <div className="new-course-duration">
                        <p className="new-course-instruction">
                            Training Availability Days*
                        </p>
                        <input
                            type="date"
                            className="new-course-grade-duration"
                            placeholder="Select Time"
                        />
                    </div>
                    <div className="new-course-duration">
                        <p className="new-course-instruction">
                            Preferred Occasion Leave Dates
                        </p>
                        <input
                            type="date"
                            className="new-course-grade-duration"
                            placeholder="Select Time"
                        />
                    </div>
                </div>
                <div className="new-course-duration">
                    <p className="new-course-instruction">Availability</p>
                    <input
                        type="date"
                        className="new-course-grade"
                        placeholder="Select Time"
                    />
                </div>
            </div>
        </div>
    )
}

export default NewCourse
