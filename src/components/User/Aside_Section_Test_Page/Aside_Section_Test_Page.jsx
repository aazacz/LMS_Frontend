import React from "react";
import Test1 from "../../../assets/Test_Page_Aside_Section/Test1.jpg";
import Course1 from "../../../assets/Test_Page_Aside_Section/Course1.jpg";
import Course2 from "../../../assets/Test_Page_Aside_Section/Course2.jpg";

const Aside_Section_Test_Page = () => {
  const testData = [
    {
      imageSrc: Test1,
      title: "SAT Practice Test",
      description: "English & Writing Skills Test",
      progress: 60,
    },
    {
      imageSrc: Test1,
      title: "TOEFL Practice Test",
      description: "Listening & Speaking Skills Test",
      progress: 80,
    },
    {
      imageSrc: Test1,
      title: "GRE Practice Test",
      description: "Quantitative Reasoning Test",
      progress: 40,
    },
    // Add more test objects as needed
  ];
  const materialsData = [
    {
      imageSrc: Course1,
      course: "Course 1",
      chapter: "Chapter 1",
    },
    {
      imageSrc: Course1,
      course: "Course 1",
      chapter: "Chapter 2",
    },
    {
      imageSrc: Course2,
      course: "Course 2",
      chapter: "Chapter 1",
    },
    // Add more material objects as needed
  ];
  return (
    <div className="w-full h-full pb-5">
      <div className="w-full h-full flex flex-col">
        <div className="w-full font-medium p-2 text-sm md:text-base lg:text-lg">
          Incomplete Tests and Materials
        </div>
        <div className="w-95px mx-2 overflow-x-auto">
          <div className="pl-5 font-medium mt-2">Incomplete Tasks</div>
          <div className="flex flex-row overflow-y-scroll p-2 gap-2">
            {testData.map((test, index) => (
              <div
                key={index}
                className="w-64 min-h-48 flex flex-col shadow-xl gap-2 rounded-2xl my-2 mx-2 p-2 bg-white"
              >
                <div className="w-full h-24 overflow-hidden rounded-t ">
                  <img
                    src={test.imageSrc}
                    alt={`Test ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="text-sm font-semibold mx-2 line-clamp-1">
                  {test.title}
                </h5>
                <h5 className="text-xs mx-2 font-medium line-clamp-2">
                  {test.description}
                </h5>
                <button className="text-xs w-max h-max md:h-4 lg:h-8 bg-yellow-600 rounded-xl my-2 mx-2 px-2 font-semibold">
                  Complete Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-95px mx-2 mt-2 bg-white">
          <div className="pl-5 font-medium mt-2">Materials</div>
          <div className="flex flex-row overflow-y-scroll p-2 gap-2">
            {materialsData.map((material, index) => (
              <div
                key={index}
                className="w-64 min-h-48 flex flex-col shadow-xl gap-2 rounded-2xl my-2 mx-2 p-2 bg-white"
              >
                <div className="w-full h-24 overflow-hidden rounded-t">
                  <img
                    src={material.imageSrc}
                    alt={`Course ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="text-sm font-semibold mx-2 line-clamp-1">
                  {material.course}
                </h5>
                <h5 className="text-xs mx-2 font-medium line-clamp-2">
                  {material.chapter}
                </h5>
                <button className="text-xs w-max h-max md:h-4 lg:h-8 bg-yellow-600 rounded-xl my-2 mx-2 px-2 font-semibold">
                  Download Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside_Section_Test_Page;
