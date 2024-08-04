import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Animation_Courses.css";
import PopularCourses from "../../../assets/Student/PopularCourses.png";

const MathsSAT = () => (
    <div className="animation-courses-maths">
        <div className="animation-courses-maths-sub1">
            <div className="maths-sat-title">MATHS SAT</div>
            <div className="maths-sat-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis porro iure quo voluptate omnis alias praesentium qui
                reiciendis nobis.
                <br /> Corporis soluta eaque a accusamus neque provident et ab
                aliquam adipisci!
            </div>
            <div className="maths-sat-review">
                {' '}
                &#x275D; The course was beautifully conceptualized and well
                presented. The videos were lucid, clear, articulate, and
                informative.&#x275E;
                <div className="maths-sat-review-user">Charles, UK</div>
            </div>
            <button className="maths-sat-button">Explore Course</button>
        </div>
        <div className="animation-courses-maths-sub2">
            <div className="maths-sat-programme1">
                <div className="maths-sat-programme1-photo overflow-hidden">
                    <img src={PopularCourses} alt="Course Image" />
                </div>
                <div className="maths-sat-programme1-type">
                    Self Assessment Test
                </div>
                <div className="maths-sat-programme1-title">MATHS SAT</div>
                <div className="maths-sat-programme1-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Minus, perferendis? Non fugit expedita error consectetur!{' '}
                </div>
                <div className="maths-sat-programme1-duration">Long Course</div>
            </div>
            <div className="maths-sat-programme2">
                <div className="maths-sat-programme1-photo overflow-hidden">
                    <img src={PopularCourses} alt="Course Image" />
                </div>
                <div className="maths-sat-programme1-type">
                    Self Assessment Test
                </div>
                <div className="maths-sat-programme1-title">MATHS SAT</div>
                <div className="maths-sat-programme1-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Minus, perferendis? Non fugit expedita error consectetur!{' '}
                </div>
                <div className="maths-sat-programme1-duration">Long Course</div>
            </div>
        </div>
    </div>
);

const EnglishSAT = () => (
    <div className="animation-courses-maths">
        <div className="animation-courses-maths-sub1">
            <div className="maths-sat-title">ENGLISH SAT</div>
            <div className="maths-sat-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis porro iure quo voluptate omnis alias praesentium qui
                reiciendis nobis.
                <br /> Corporis soluta eaque a accusamus neque provident et ab
                aliquam adipisci!
            </div>
            <div className="maths-sat-review">
                {' '}
                &#x275D; The course was beautifully conceptualized and well
                presented. The videos were lucid, clear, articulate, and
                informative.&#x275E;
                <div className="maths-sat-review-user">Linda, USA</div>
            </div>
            <button className="maths-sat-button">Explore Course</button>
        </div>
        <div className="animation-courses-maths-sub2">
            <div className="maths-sat-programme1">
                <div className="maths-sat-programme1-photo overflow-hidden">
                    <img src={PopularCourses} alt="Course Image" />
                </div>
                <div className="maths-sat-programme1-type">
                    Self Assessment Test
                </div>
                <div className="maths-sat-programme1-title">ENGLISH SAT</div>
                <div className="maths-sat-programme1-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Minus, perferendis? Non fugit expedita error consectetur!{' '}
                </div>
                <div className="maths-sat-programme1-duration">Long Course</div>
            </div>
            <div className="maths-sat-programme2">
                <div className="maths-sat-programme1-photo overflow-hidden">
                    <img src={PopularCourses} alt="Course Image" />
                </div>
                <div className="maths-sat-programme1-type">
                    Self Assessment Test
                </div>
                <div className="maths-sat-programme1-title">ENGLISH SAT</div>
                <div className="maths-sat-programme1-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Minus, perferendis? Non fugit expedita error consectetur!{' '}
                </div>
                <div className="maths-sat-programme1-duration">Long Course</div>
            </div>
        </div>
    </div>
);

const TestsOnly = () => <div>Tests Only Content</div>;
const ExploreAfterDiagnoseTest = () => (
    <div>Explore After Diagnose Test Content</div>
);

const Animation_Courses = () => {
    const navigate = useNavigate();
    const categories = [
        'Maths SAT',
        'English SAT',
        'Tests Only',
        'Explore After Diagnose Test',
    ];

    const [selectedCategory, setSelectedCategory] = useState('Maths SAT');

    const handleButtonClick = (category) => {
        setSelectedCategory(category);
    };

    const renderContent = () => {
        switch (selectedCategory) {
            case 'Maths SAT':
                return <MathsSAT />;
            case 'English SAT':
                return <EnglishSAT />;
            case 'Tests Only':
                return <TestsOnly />;
            case 'Explore After Diagnose Test':
                return <ExploreAfterDiagnoseTest />;
            default:
                return <div>Please select a category.</div>;
        }
    };

    const handleViewAllCoursesClick = () => {
        navigate("/allcourses");
    };

    return (
        <div>
            <div className="animation-courses-main-container">
                <div className="animation-courses-sub-container">
                    <div className="animation-courses-header">
                        <div className="animation-title-container">
                            <div className="animation-courses-title">
                                Explore Popular Classes
                            </div>
                            <div className="animation-courses-title-underline"></div>
                        </div>
                        <div
                            className="animation-courses-title-button"
                            onClick={handleViewAllCoursesClick}
                        >
                            View All Courses
                        </div>
                    </div>
                    <div className="animation-courses-container ">
                        <div className="dropdown-menu ">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`dropdown-button ${selectedCategory === category ? 'selected' : ''}`}
                                    onClick={() => handleButtonClick(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="category-content flex flex-wrap ">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Animation_Courses;
