import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Edit, Trash } from "lucide-react";

const SessionForm = ({ onSubmit, session, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    session
      ? {
          defaultValues: {
            sessionName: session.sessionName,
            sessionDescription: session.sessionDescription,
            sessionLink: session.sessionLink,
            sessionDate: new Date(session.sessionDateTime)
              .toISOString()
              .split("T")[0],
            sessionTime: new Date(session.sessionDateTime)
              .toTimeString()
              .slice(0, 5),
            sessionDurationHours: session.sessionDurationHours,
            sessionDurationMinutes: session.sessionDurationMinutes,
          },
        }
      : {
          defaultValues: { sessionDurationHours: 0, sessionDurationMinutes: 0 },
        }
  );
  const sessionDurationMinutes = watch("sessionDurationMinutes");

  return (
    <div>
      <h1 className="text-lg text-center">
        {session ? "Edit session" : "Add session"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-2"
      >
        <div className="flex-flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Session name
          </label>
          <input
            placeholder="Enter session name"
            {...register("sessionName", {
              required: "Session name is required",
              minLength: {
                value: 3,
                message: "Session name must be at least 3 characters",
              },
              maxLength: {
                value: 25,
                message: "Session name must be at most 25 characters",
              },
            })}
            className="p-2 border-2 border-slate-300 rounded-md w-full"
            type="text"
          />
          {errors.sessionName && (
            <span className="text-red-500">{errors.sessionName.message}</span>
          )}
        </div>
        <div className="flex-flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Session description
          </label>
          <textarea
            placeholder="Enter session description"
            {...register("sessionDescription", {
              required: "Session description is required",
              minLength: {
                value: 3,
                message: "Session description must be at least 3 characters",
              },
              maxLength: {
                value: 200,
                message: "Session description must be at most 25 characters",
              },
            })}
            rows={3}
            className="p-2 border-2 border-slate-300 rounded-md w-full"
            type="text"
          />
          {errors.sessionDescription && (
            <span className="text-red-500">
              {errors.sessionDescription.message}
            </span>
          )}
        </div>
        <div className="flex-flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Session link
          </label>
          <input
            placeholder="Enter session link"
            {...register("sessionLink", {
              required: "Session link is required",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: "Invalid URL",
              },
            })}
            className="p-2 border-2 border-slate-300 rounded-md w-full"
            type="text"
          />
          {errors.sessionLink && (
            <span className="text-red-500">{errors.sessionLink.message}</span>
          )}
        </div>
        <div className="flex-flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Session date
          </label>
          <input
            {...register("sessionDate", {
              required: "Session date is required",
              validate: (value) => {
                const currentDate = new Date();
                const selectedDate = new Date(value);
                return (
                  selectedDate >= currentDate || "Date must be in the future"
                );
              },
            })}
            className="p-2 border-2 border-slate-300 rounded-md w-full"
            type="date"
          />
          {errors.sessionDate && (
            <span className="text-red-500">{errors.sessionDate.message}</span>
          )}
        </div>
        <div className="flex-flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Session time
          </label>
          <input
            {...register("sessionTime", {
              required: "Session time is required",
            })}
            className="p-2 border-2 border-slate-300 rounded-md w-full"
            type="time"
          />
          {errors.sessionTime && (
            <span className="text-red-500">{errors.sessionTime.message}</span>
          )}
        </div>
        <div className="flex-flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Session duration
          </label>
          <div className="flex items-center gap-2">
            <select
              {...register("sessionDurationHours", {
                required: "Session duration is required",
                validate: (value) => {
                  const selectedHours = parseInt(value);
                  const selectedMinutes = parseInt(sessionDurationMinutes);
                  if (selectedHours === 0 && selectedMinutes === 0) {
                    return "Duration must be greater than 0";
                  }
                  return true;
                },
              })}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <span className="font-semibold text-slate-400">hr</span>
            <select {...register("sessionDurationMinutes")}>
              <option value="0">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <span className="font-semibold text-slate-400">min</span>
          </div>
          {errors.sessionDurationHours && (
            <span className="text-red-500">
              {errors.sessionDurationHours.message}
            </span>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-black text-white p-2"
          >
            Cancel
          </button>
          <button type="submit" className="bg-black text-white p-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const ModuleRow = ({
  value,
  index,
  onEditClick,
  onDeleteClick,
  setSelectedSession,
  setSelectedModuleId,
  setShowForm,
}) => {
  const [showSessions, setShowSessions] = useState(false);
  return (
    <div
      key={value._id}
      className="flex flex-col w-full justify-between items-center py-5"
    >
      <div className="flex gap-x-3 items-center">
        <div>
          <div className="w-6 h-6 bg-[#C75625] text-white rounded-[5px] text-sm flex justify-center items-center">
            {index + 1}
          </div>
        </div>

        <div className="flex w-full justify-between items-center">
          <h1 className="text-orange-600 text-[12px] w-fit truncate">
            {value.moduleName}
          </h1>
          <div className="flex items-center">
            <h1 className="text-right text-nowrap text-xs text-gray-400 mr-2 w-fit ml-2">
              {value.sessions ? value.sessions.length : "0"} Sessions
            </h1>
            <button
              onClick={() => {
                setSelectedModuleId(value._id);
                setShowForm(true);
              }}
              className="rounded-md bg-green-500 text-white font-semibold text-xs text-nowrap py-1 px-2"
            >
              Add
            </button>
            {showSessions ? (
              <ChevronUp
                className="cursor-pointer"
                onClick={() => setShowSessions(false)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                onClick={() => setShowSessions(true)}
              />
            )}
          </div>
        </div>
      </div>
      {showSessions &&
        value.sessions.map((session, index) => (
          <div
            key={index}
            className="flex self-start mt-2 w-full border-b rounded-md flex-col gap-y-2 ml-5"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-sm text-nowrap truncate">
                {index + 1}. {session.sessionName}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedSession(session);
                    onEditClick();
                  }}
                  className="w-fit mr-4 text-blue-400"
                >
                  <Edit size={"1rem"} />
                </button>
                <button
                  onClick={() => {
                    setSelectedSession(session);
                    onDeleteClick();
                  }}
                  className="w-fit mr-4 text-red-400"
                >
                  <Trash size={"1rem"} />
                </button>
              </div>
            </div>
            <h1 className="text-xs text-nowrap text-gray-400">
              {session.sessionDateTime?.split("T")[0]} --
              {new Date(session.sessionDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h1>
          </div>
        ))}
    </div>
  );
};

const Asidebar = ({ course, setTutorModal, setStudentModal, refetch }) => {
  const { courseId } = useParams();
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (course && course.modules) {
      setModules(course.modules);
    }
  }, [course]);

  const deleteHandler = (id) => {
    AdminAxiosInstance.delete(`${baseUrl}api/course/delete/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.message === "Course deleted successfully") {
          Swal.fire({
            timer: 2000,
            timerProgressBar: true,
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          navigate("/admin/home/courses");
        }
      })
      .catch((error) => {
        console.warn(error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the course. Please try again later.",
          icon: "error",
        });
      });
  };

  const handleDeleteCourse = () => {
    Swal.fire({
      title: `Are you sure you want to delete this course?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb5048",
      cancelButtonColor: "#878ca7",
      confirmButtonText: "Delete Course!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Are you absolutely sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: true,
          confirmButtonColor: "#eb5048",
          cancelButtonColor: "#878ca7",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteHandler(courseId);
          }
        });
      }
    });
  };

  const handleEditCourse = () => {
    Swal.fire({
      title: `Are you sure you want to edit this course?`,
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#eb5048",
      cancelButtonColor: "#878ca7",
      confirmButtonText: "Edit Course!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/admin/home/courses/editcourse/${courseId}`);
      }
    });
  };

  const addSession = async (values) => {
    try {
      // console.log(values);
      // return;
      const combinedDateAndTime = new Date(
        `${values.sessionDate}T${values.sessionTime}:00`
      );
      const { data } = await AdminAxiosInstance.post("api/course/session", {
        courseId: courseId,
        moduleId: selectedModuleId,
        session: {
          sessionName: values.sessionName,
          sessionDescription: values.sessionDescription,
          sessionLink: values.sessionLink,
          sessionDateTime: combinedDateAndTime,
          sessionDurationHours: Number(values.sessionDurationHours),
          sessionDurationMinutes: Number(values.sessionDurationMinutes),
        },
      });
      refetch();
      setSelectedModuleId("");
      setShowForm(false);
      toast.success("Successfully added session");
    } catch (error) {
      console.log(error);
    }
  };

  const editSession = async (values) => {
    try {
      const combinedDateAndTime = new Date(
        `${values.sessionDate}T${values.sessionTime}:00`
      );
      const { data } = await AdminAxiosInstance.put("api/course/session", {
        courseId: courseId,
        moduleId: selectedModuleId,
        session: {
          _id: selectedSession._id,
          sessionName: values.sessionName,
          sessionDescription: values.sessionDescription,
          sessionLink: values.sessionLink,
          sessionDateTime: combinedDateAndTime,
          sessionDurationHours: values.sessionDurationHours,
          sessionDurationMinutes: values.sessionDurationMinutes,
        },
      });
      refetch();
      setShowForm(false);
      setSelectedSession(null);
      setSelectedModuleId("");
      toast.success("Successfully edited session");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSession = async () => {
    try {
      const { data } = await AdminAxiosInstance.delete(
        `api/course/session/${courseId}/${selectedSession._id}`
      );
      refetch();
      toast.success("Successfully deleted session");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteSession = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete this session?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb5048",
      cancelButtonColor: "#878ca7",
      confirmButtonText: "Delete Session!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSession();
      } else {
        setSelectedSession(null);
      }
    });
  };

  return (
    <div className="relative bg-slate-200 lg:w-[45%] w-full h-fit flex flex-col pb-8 min-h-screen">
      {/* Adding student and tutor */}
      <div className="w-full relative flex justify-evenly h-max p-4">
        <div
          onClick={() => setTutorModal(true)}
          data-tooltip-id="assigntutor"
          data-tooltip-content="Assign Tutor"
          className="rounded-full border-[3px] text-gray-700 hover:text-gray-900 border-gray-700 hover:border-gray-900 transition-all duration-200 bg-white w-14 h-14 flex justify-center items-center"
        >
          +<FaChalkboardTeacher className="text-2xl" />
          <Tooltip id="assigntutor" place="bottom" type="dark" effect="solid" />
        </div>
        <div
          onClick={() => setStudentModal(true)}
          data-tooltip-id="assignstudent"
          data-tooltip-content="Assign Student"
          className="rounded-full border-[3px] text-gray-700 hover:text-gray-900 border-gray-700 hover:border-gray-900 transition-all duration-200 bg-white w-14 h-14 flex justify-center items-center"
        >
          +<PiStudentBold className="text-2xl" />
          <Tooltip
            id="assignstudent"
            place="bottom"
            type="dark"
            effect="solid"
          />
        </div>
      </div>

      <div className="px-6">
        {showForm ? (
          <SessionForm
            onSubmit={selectedSession ? editSession : addSession}
            session={selectedSession}
            onClose={() => setShowForm(false)}
          />
        ) : (
          <>
            <h1 className="font-poppins font-bold">Modules List</h1>

            <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center">
              <h1 className="font-poppins font-bold line-clamp-2">
                {course ? course.courseName : ""}
              </h1>
              {modules.map((value, index) => (
                <ModuleRow
                  onEditClick={() => {
                    setSelectedModuleId(value._id);
                    setShowForm(true);
                  }}
                  onDeleteClick={handleDeleteSession}
                  setSelectedSession={setSelectedSession}
                  setSelectedModuleId={setSelectedModuleId}
                  value={value}
                  setShowForm={setShowForm}
                  key={value._id}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {!showForm && (
        <div className="w-full absolute bottom-0 grid grid-flow-row grid-cols-2 gap-x-4 mb-4 px-4">
          <div
            className="cursor-pointer h-max rounded-xl flex justify-center items-center text-base font-semibold font-poppins border-[1px] text-blue-700 border-blue-600 bg-opacity-30 bg-blue-500"
            onClick={handleEditCourse}
          >
            <h1 className="text-sm md:text-base">Edit</h1>
          </div>

          <div
            className="cursor-pointer h-max rounded-xl flex justify-center items-center text-base font-semibold font-poppins border-[1px] text-red-700 border-red-600 bg-opacity-30 bg-red-500"
            onClick={handleDeleteCourse}
          >
            <h1 className="text-sm md:text-base">Delete</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Asidebar;
