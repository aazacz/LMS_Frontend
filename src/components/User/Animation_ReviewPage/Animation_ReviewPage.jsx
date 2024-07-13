import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos' // Import icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Image1 from '../../../assets/Animation_ReviewPage/Rectangle2.png'
import Image2 from '../../../assets/Animation_ReviewPage/Rectangle7.png'
import './Animation_ReviewPage.css'

const reviews = [
    {
        name: 'Merry Welsom',
        score: '1522 Marks SAT',
        institution: 'Stockholm University',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, ipsa laudantium? Voluptatum perspiciatis aliquid vero ratione quia aut id, porro commodi culpa laudantium nobis vitae obcaecati neque tenetur sed? Accusamus.',
    },
    {
        name: 'Alina',
        score: '1420 Marks SAT',
        institution: 'Harvard University',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, ipsa laudantium? Voluptatum perspiciatis aliquid vero ratione quia aut id, porro commodi culpa laudantium nobis vitae obcaecati neque tenetur sed? Accusamus.',
    },
]

const Animation_ReviewPage1 = () => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

    const handleLeftClick = () => {
        const newIndex =
            (currentReviewIndex - 1 + reviews.length) % reviews.length
        setCurrentReviewIndex(newIndex)
    }

    const handleRightClick = () => {
        const newIndex = (currentReviewIndex + 1) % reviews.length
        setCurrentReviewIndex(newIndex)
    }

    const currentReview = reviews[currentReviewIndex]

    return (
        <div className="animation-review-main-container">
            <div className="animation-review-title-conatainer">
                <div className="animation-review-title">
                    What our Students Say
                </div>
                <div className="animation-courses-title-underline1"></div>
            </div>
            <div className="animation-review-contents">
                <div
                    className="animation-review-left-button "
                    onClick={handleLeftClick}
                >
                    <ArrowForwardIosIcon className="rotate-180" />
                </div>
                <div className="animation-review-content">
                    <div className="animation-review-testimonial">
                        <div className="animation-review-profile relative">
                            <div className="animation-review-profile-image    flex justify-center items-center">
                                <div className="md:w-[200px] w-[150px] h-[150px] md:h-[200px] relative ">
                                    <img
                                        className="md:w-32 md:h-32   w-20 h-20  absolute left-4 top-2   md:top-2  md:left-2 z-10"
                                        src={Image2}
                                    />
                                    <img
                                        className="md:w-32 md:h-32   w-20 h-20  absolute right-4 bottom-2   md:top-12 md:right-2     "
                                        src={Image1}
                                    />
                                </div>
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
                        <div className="animation-review-testimonial_main">
                            <div className="animation-review-testimonial-text">
                                <div className="larger-quotation">&#x275D;</div>
                                <div className="animation-review-testimonial-content">
                                    {currentReview.content}
                                </div>
                                <div className="larger-quotation1">
                                    &#x275E;
                                </div>
                            </div>
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
    )
}

export default Animation_ReviewPage1
