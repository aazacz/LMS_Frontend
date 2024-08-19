import React, { useEffect, useState } from "react";
import coursephoto from "../../assets/Student/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const AllCourses = () => {
  const token = useSelector((state) => state.AdminDetails.token);

  const [EnrolledCourse, SetEnrolledCourse] = useState();
  const [Course, SetCourse] = useState();

  const getEnrolledList = async () => {
    const response = await axiosInstanceStudent.get(
      "api/student-course/enrolled-courses"
    );
    SetEnrolledCourse(response.data);
    // return response.data;
  };
  const getCourseList = async () => {
    try {
      console.log("useQuery funciton hitted");
      const response = await axiosInstanceStudent.get(
        `api/student-course/all-active-courses`
      );
      console.log("response.data");
      console.log(response.data);
      SetCourse(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["ActiveCourse"],
    queryFn: getCourseList,
    staleTime: 8000,
    refetchInterval: 60000,
  });

  useEffect(() => {
    refetch();
    getEnrolledList();
  }, []);

  useEffect(() => {
    console.log("EnrolledCourse");
    console.log(EnrolledCourse);
  }, [EnrolledCourse]);

  const bestinmarket = [
    { title: "Introduction Basic SAT & DSAT" },
    { title: "Introduction Basic SAT & DSAT" },
    { title: "Introduction Basic SAT & DSAT" },
    { title: "Introduction Basic SAT & DSAT" },
  ];

  return (
    <div className="p-4 pb-10  h-max   no-scrollbar w-full">
      {/*           
            <div>
                <h1 className="font-poppins font-semibold text-lg py-2">
                    Enrolled Course
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        <>
                            {[...Array(4)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </>
                    ) : (
 

                        EnrolledCourse&&EnrolledCourse?.map((course, index) => (
                            <Link key={index} to= {`/student/courses/${course._id}/${course?.courseType}/true/s`}>
                                <CourseCard  course={course} />
                            </Link>
                        ))
                    )
                    
                    
                    }
                </div>
            </div> */}

      <div className="w-full font-poppins">
        <h1 className="p-2 font-bold text-base md:text-base lg:text-lg">
          Individual Course
        </h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPending ? (
            <>
              {[...Array(4)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </>
          ) : Course && Course.individual.length > 0 ? (
            Course.individual.map((course, index) => (
              <Link
                key={index}
                to={`/student/courses/${course._id}/individual/false/s`}
              >
                <CourseCard course={course} />
              </Link>
            ))
          ) : (
            <div className="w-full   text-center">
              {" "}
              There are no courses no show{" "}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <h1 className="font-poppins font-semibold text-lg py-2">
          Group Course
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPending ? (
            <>
              {[...Array(4)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </>
          ) : Course && Course.group.length > 0 ? (
            Course.group.map((course, index) => (
              <Link
                key={index}
                to={`/student/courses/${course._id}/group/false/s`}
              >
                <CourseCard course={course} />
              </Link>
            ))
          ) : (
            <p> There are no courses no show </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h1 className="font-poppins font-semibold text-lg py-2">
          Best In Market
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestinmarket.map((course, index) => (
            <Link key={index} to={`/admin/home/courses/1`}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;

// Course Card Component
const CourseCard = ({ course }) => {
  return (
    <div className="bg-[#F4F5FB] md:p-4 h-[280px] rounded-2xl flex flex-col items-center overflow-hidden p-3">
      <div className=" w-full flex justify-center object-cover items-center rounded-xl overflow-hidden">
        {course?.imageUrl ? (
          <img
            src={course?.imageUrl}
            className="w-fit h-[300px]"
            alt="Course"
          />
        ) : (
          <img src={coursephoto} className="w-full h-[300px]" alt="Course" />
        )}
      </div>
      <div className="w-full mt-4">
        <div className="min-h-[3rem]">
          <h1 className="font-poppins font-semibold text-base line-clamp-2">
            {course?.courseName || "Course Name"}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-x-2 ">
          <span className="flex font-poppins items-center gap-x-1 text-sm text-red-600">
            Rs. {course.price}
          </span>
        </div>
        <div className="flex items-center gap-x-6 mt-2">
          <span className="flex items-center gap-x-1 text-sm font-poppins">
            <BiSpreadsheet className="text-gray-400" />{" "}
            {course?.modules?.length || 0} Modules
          </span>
          <span className="flex items-center gap-x-1 text-sm font-poppins">
            <LuTimer className="text-gray-400" />{" "}
            {course?.trainingDuration || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Skeleton Card Component
const SkeletonCard = () => {
  return (
    <div className="bg-[#F4F5FB] p-4 rounded-2xl min-h-[16rem] h-auto">
      <div className="w-full rounded-lg bg-gray-300 h-48">
        <Skeleton height={192} />
      </div>
      <div className="w-full mt-4">
        <div className="min-h-[3rem]">
          <Skeleton height={24} width={`80%`} />
        </div>
        <div className="flex items-center gap-x-6 mt-2">
          <span className="flex items-center gap-x-1 text-sm font-poppins bg-gray-300 rounded w-20 h-6">
            <Skeleton width={80} />
          </span>
          <span className="flex items-center gap-x-1 text-sm font-poppins bg-gray-300 rounded w-20 h-6">
            <Skeleton width={80} />
          </span>
        </div>
      </div>
    </div>
  );
};
