import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; // Import icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image1 from "../../../assets/Animation_ReviewPage/Rectangle2.png";
import Image2 from "../../../assets/Animation_ReviewPage/Rectangle7.png";
import "./Animation_ReviewPage.css";

const reviews = [
  {
    name: "Merry Welsom",
    score: "1522 Marks SAT",
    institution: "Stockholm University",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, ipsa laudantium? Voluptatum perspiciatis aliquid vero ratione quia aut id, porro commodi culpa laudantium nobis vitae obcaecati neque tenetur sed? Accusamus.",
  },
  {
    name: "Alina",
    score: "1420 Marks SAT",
    institution: "Harvard University",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, ipsa laudantium? Voluptatum perspiciatis aliquid vero ratione quia aut id, porro commodi culpa laudantium nobis vitae obcaecati neque tenetur sed? Accusamus.",
  },
  // ... add more review objects here
];

const Animation_ReviewPage1 = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0); // Current review index

  const handleLeftClick = () => {
    const newIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length; // Handle circular navigation
    setCurrentReviewIndex(newIndex);
  };

  const handleRightClick = () => {
    const newIndex = (currentReviewIndex + 1) % reviews.length;
    setCurrentReviewIndex(newIndex);
  };

  const currentReview = reviews[currentReviewIndex]; // Get the current review

  return (
    <div className="animation-review-main-container">
      <div className="animation-review-title-conatainer">
        <div className="animation-review-title">What our Students Say</div>
        <div className="animation-courses-title-underline1"></div>
      </div>
      <div className="animation-review-contents">
        <div className="animation-review-left-button" onClick={handleLeftClick}>
          <ArrowBackIosIcon />
        </div>
        <div className="animation-review-content">
          <div className="animation-review-testimonial">
            <div className="animation-review-profile relative">
              <div className="animation-review-profile-image relative ">
                <img className="w-40 h-40  absolute z-10" src={Image2} />
                <img
                  className="w-40 h-40 mt-12 ml-24 absolute  "
                  src={Image1}
                />
              </div>
              <div className="animation-review-profile-name">
                {currentReview.name}
              </div>
              <div className="animation-review-profile-details">
                {currentReview.score}
                <br />
                {currentReview.institution}
              </div>
            </div>
            <div className="animation-review-testimonial-text">
              <div className="larger-quotation">&#x275D;</div>
              <div className="animation-review-testimonial-content">
                {currentReview.content}
              </div>
              <div className="larger-quotation1">&#x275E;</div>
            </div>
          </div>
        </div>
        <div
          className="animation-review-right-button"
          onClick={handleRightClick}
        >
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default Animation_ReviewPage1;
