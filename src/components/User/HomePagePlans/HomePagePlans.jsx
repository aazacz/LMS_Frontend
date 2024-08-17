import React from "react";
import "./HomePagePlans.css";
import Plan from "../../../assets/HomePagePlans/Plan.png";

const plansData = [
  {
    title: "MATH Test",
    price: "₹9,999",
    image: Plan,
    features: [
      "Two-week design sprint",
      "Unlimited requests & revisions",
      "Up to 1 meeting per week",
      "Avg. 2-3 days delivery",
      "Dev ready Figma files",
    ],
  },
  {
    title: "MATH Test",
    price: "₹9,999",
    image: Plan,
    features: [
      "Two-week design sprint",
      "Unlimited requests & revisions",
      "Up to 1 meeting per week",
      "Avg. 2-3 days delivery",
      "Dev ready Figma files",
    ],
  },
  {
    title: "MATH Test",
    price: "₹9,999",
    image: Plan,
    features: [
      "Two-week design sprint",
      "Unlimited requests & revisions",
      "Up to 1 meeting per week",
      "Avg. 2-3 days delivery",
      "Dev ready Figma files",
    ],
  },
  {
    title: "MATH Test",
    price: "₹9,999",
    image: Plan,
    features: [
      "Two-week design sprint",
      "Unlimited requests & revisions",
      "Up to 1 meeting per week",
      "Avg. 2-3 days delivery",
      "Dev ready Figma files",
    ],
  },
];

const HomePagePlans = () => {
  return (
    <div className="w-screen  flex justify-center h-full ">
      <div className="plans-container max-w-[1200px] bg-white pb-12">
        <div className="plans-heading ">
          <h3>Plans & Pricing</h3>
          <p>
            Invest in your future with Unlimited access to 1400+ high-quality
            short courses and digital certifications from world-class
            institutions.
          </p>
          <button className="plans-button-explore">Explore Plans</button>
        </div>
        <div className="pricing-cards">
          {plansData.map((plan, index) => (
            <div className="pricing-card" key={index}>
              <img src={plan.image} alt={plan.title} />
              <h3>{plan.title}</h3>
              <p>{plan.price}</p>
              <button className="start-button">Start a Free Trial</button>
              <ul className="features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePagePlans;
