import { useState, useRef, useEffect } from "react";
import "./Assignments.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";
import axios from "axios";

const Assignments = () => {
  const input = useRef();
  const baseURL = process.env.REACT_APP_API_URL;

  const { courseId } = useParams();
  console.log(courseId);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setassignmentDescription] = useState("");
  const [file, setFile] = useState();
  const [fileName, setfileName] = useState("");
  const [dueDate, setDueDate] = useState({ value: "", error: null });
  const [totalMarks, setTotalMark] = useState({ value: 0, error: null });

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [fileError, setFileError] = useState("");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleNameChange = (e) => {
    setAssignmentName(e.target.value);
    setNameError("");
  };

  const handleDescriptionChange = (e) => {
    setassignmentDescription(e.target.value);
    setDescriptionError("");
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}api/course/get-course/${courseId}`
        );
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, baseURL]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.type);
    console.log(e.target.files[0]);
    setfileName(e.target.files[0].name);
    setFileError("");
  };

  const handleSubmit = async (e) => {
    // console.log(e.target.value);
    e.preventDefault();
    let valid = true;
    if (!assignmentName) {
      setNameError("Assignment name is required");
      valid = false;
    }
    if (!assignmentDescription) {
      setDescriptionError("Assignment description is required");
      valid = false;
    }
    if (!file) {
      setFileError("Please select a file");
      valid = false;
    }

    if (dueDate.value === "") {
      setDueDate({ ...dueDate, error: "Due date is required" });
      valid = false;
    }
    if (totalMarks.value === 0) {
      setTotalMark({ ...totalMarks, error: "Total marks is required" });
      valid = false;
    }

    if (!valid) return;
    const fileName = `${Date.now()}-${file.name}`;
    const formData = new FormData();
    formData.append("assignmentName", assignmentName);
    formData.append("assignmentDescription", assignmentDescription);
    formData.append("fileName", fileName);
    formData.append("file", file);
    formData.append("dueDate", dueDate.value);
    formData.append("totalMarks", totalMarks.value);
    formData.append("courseId", courseId);

    try {
      const response = await TutorAxiosInstance.post(
        // `api/assignments/create-assignment/${courseId}`,
        `api/assignments/tutor/create`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Assignment created successfully",
        });

        setAssignmentName("");
        setassignmentDescription("");
        setFile(null);
        setfileName("");
        input.current.value = "";
        setDueDate({ value: "", error: null });
        setTotalMark({ value: 0, error: null });
      }

      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error creating assignment:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="new-assignment-container border-2 border-red-800">
      <form onSubmit={handleSubmit}>
        <p className="new-assignment-title">New Assignment - {course?.courseName}</p>
        <p className="new-assignment-instruction">Name of Assignment</p>
        <input
          type="text"
          className="new-assignment-name"
          placeholder="Enter Assignment Name"
          value={assignmentName}
          onChange={handleNameChange}
        />
        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        <p className="new-assignment-instruction">Description</p>
        <textarea
          name="postContent"
          className="new-assignment-name"
          placeholder="Enter Assignment Description"
          rows={4}
          cols={40}
          value={assignmentDescription}
          onChange={handleDescriptionChange}
        />
        {descriptionError && (
          <p className="text-red-500 text-sm">{descriptionError}</p>
        )}
        {/* total mark */}
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="new-assignment-instruction">Total Marks</p>
            <input
              type="number"
              value={totalMarks.value}
              onChange={(e) =>
                setTotalMark({ value: e.target.value, error: null })
              }
              className="new-assignment-name"
              placeholder="Total Marks"
              max={100}
            />
            {totalMarks.error && (
              <p className="text-red-500 text-sm">{totalMarks.error}</p>
            )}
          </div>
          <div className="flex-1">
            <p className="new-assignment-instruction">Due Date</p>
            <input
              type="date"
              value={dueDate.value}
              onChange={(e) =>
                setDueDate({ value: e.target.value, error: null })
              }
              className="new-assignment-name"
              min={new Date().toISOString().split("T")[0]}
            />
            {dueDate.error && (
              <p className="text-red-500 text-sm">{dueDate.error}</p>
            )}
          </div>
        </div>

        <p className="new-assignment-instruction">Select Files</p>
        <div className="file-input">
          <input
            ref={input}
            type="file"
            className="btn"
            id="file-upload"
            accept=".pdf, .docx, .doc"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
          <label htmlFor="file-upload" className="file-input-button">
            Browse
          </label>
        </div>
        {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
        <button type="submit" className="create-assignment">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default Assignments;
