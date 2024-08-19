import React, { useEffect, useState } from "react";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import Loader from "../../reusable/Loader";

const AddDeletemodal = ({
  List,
  Role,
  HandleModalClose,
  courseId,
  Loader,
  setcount,
  List2,
}) => {
  const [AddList, setAddList] = useState(null);
  const [RemoveList, setRemoveList] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log("name ", name);
    console.log("value ", value);
    if (name === "addSelect") {
      setAddList(value);
    } else if (name === "removeSelect") {
      setRemoveList(value);
    }
  };

  const handleAdd = async () => {
    event.preventDefault();

    try {
      if (Role === "Student") {
        const data = {
          studentId: AddList,
        };
        const response = await AdminAxiosInstance.post(
          `api/course/add-student/${courseId}`,
          data,
        );
        console.log("response");
        console.log(response);
        if (response.data.message === "Student added successfully") {
          toast.success("Student added successfully");
          setcount((prev) => prev + 1);
        } else if (
          response.data.message === "Student already enrolled in the course"
        ) {
          toast.error("Student already enrolled in the course");
        } else {
          return;
        }
      } else if (Role === "Tutor") {
        const data = {
          teacherId: AddList,
        };
        const response = await AdminAxiosInstance.post(
          `api/course/add-teacher/${courseId}`,
          data,
        );
        console.log("response");
        console.log(response);
        if (response.data.message === "Teacher added successfully") {
          toast.success("Teacher added successfully");
          setcount((prev) => prev + 1);
        } else if (
          response.data.message === "Teacher already assigned to the course"
        ) {
          toast.error("Teacher already assigned to the course");
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    event.preventDefault();

    try {
      if (Role === "Student") {
        const response = await AdminAxiosInstance.delete(
          `api/course/remove-student/${courseId}/${RemoveList}`,
        );

        if (response.data.message === "Student removed successfully") {
          toast.success("Student removed successfully");
          setcount((prev) => prev + 1);
        } else if (
          response.data.message === "Student not found in the course"
        ) {
          toast.error("Student not found in the course");
        } else {
          return;
        }
      } else if (Role === "Tutor") {
        const response = await AdminAxiosInstance.delete(
          `api/course/remove-teacher/${courseId}/${RemoveList}`,
        );
        console.log("response");
        console.log(response);
        if (response.data.message === "Teacher not found in the course") {
          toast.success("Teacher not found in the course");
          setcount((prev) => prev + 1);
        } else if (
          response.data.message === "Teacher already assigned to the course"
        ) {
          toast.error("Teacher already assigned to the course");
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full  fixed flex justify-center items-center  h-full bg-black bg-opacity-60  top-0 left-0 z-[99999] ">
      <div className="w-2/4 h-[300px] p-8 bg-white relative rounded-xl">
        <IoIosCloseCircle
          onClick={HandleModalClose}
          className="absolute right-3 top-3 text-3xl  "
        />
        {Loader ? (
          <Loader />
        ) : (
          <>
            <div className="w-full flex  h-[40px] gap-x-4  mt-5">
              <select
                onChange={handleInputChange}
                name="addSelect"
                className="w-full max-h-11  border-[1px] border-black rounded-[3px]  "
                id=""
              >
                <option defaultValue="select a tutor from the list">
                  select to add to course
                </option>
                {List &&
                  List?.map((value, index) => (
                    <option key={index} value={value._id}>
                      {value.name}
                    </option>
                  ))}
              </select>

              <button
                onClick={handleAdd}
                className="bg-blue-700 w-[90px] rounded-lg text-white"
              >
                {" "}
                Add
              </button>
            </div>

            <div className="w-full flex  h-[40px] gap-x-4  mt-5">
              <select
                name="removeSelect"
                onChange={handleInputChange}
                className="w-full max-h-11  border-[1px] border-black rounded-[3px]  "
                id=""
              >
                <option defaultValue="select a tutor from the list">
                  select to remove from course
                </option>

                {List2 &&
                  List2?.map((value, index) => (
                    <option key={index} value={value._id}>
                      {value.name}
                    </option>
                  ))}
              </select>
              <button
                onClick={handleDelete}
                className="bg-red-700 w-[90px] rounded-lg text-white"
              >
                {" "}
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddDeletemodal;
