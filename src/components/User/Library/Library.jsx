import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDownloadForOffline } from "react-icons/md";
import Library_Skeleton from "./Library_Skeleton";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import Book1 from "../../../assets/1_book_human.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Library.css'; // Import the CSS file

const Library = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [noCourses, setNoCourses] = useState(false);
  const [noMaterials, setNoMaterials] = useState(false);
  const [downloadingBooks, setDownloadingBooks] = useState({});

  useEffect(() => {
    const fetchCoursesAndBooks = async () => {
      try {
        const response = await axiosInstanceStudent.get(
          "api/studentMaterial/all-books"
        );
        console.log(response.data);

        if (Array.isArray(response.data)) {
          setCourses(response.data);
          setNoCourses(response.data.length === 0);

          const allBooks = response.data.flatMap((course) => course.books);
          setAllBooks(allBooks);

          setBooks(allBooks);
          setNoMaterials(allBooks.length === 0);
        } else if (response.data && Array.isArray(response.data.books)) {
          setBooks(response.data.books);
          setNoMaterials(response.data.books.length === 0);
        } else {
          throw new Error("Unexpected response format");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCoursesAndBooks();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const course = courses.find((c) => c.courseName === selectedCourse);
      const courseBooks = course ? course.books : [];
      setBooks(courseBooks);
      setNoMaterials(courseBooks.length === 0);
    } else {
      setBooks(allBooks);
      setNoMaterials(allBooks.length === 0);
    }
  }, [selectedCourse, courses, allBooks]);

  const handleSelect = (course) => {
    setSelectedCourse(course);
    setIsOpen(false);
  };

  const handleDownload = async (bookId) => {
    try {
      console.log(`Downloading book with ID: ${bookId}`);
      setDownloadingBooks((prev) => ({ ...prev, [bookId]: true }));
      const response = await axiosInstanceStudent.get(
        `api/studentMaterial/download-book/${bookId}`,
        { responseType: "blob" }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "book.pdf"); // Specify the file name
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Download successful");
      } else {
        console.error("Failed to download the book, status code:", response.status);
        toast.error("Download failed");
      }
    } catch (error) {
      console.error("Error downloading the book:", error);
      toast.error("Download failed");
    } finally {
      setDownloadingBooks((prev) => ({ ...prev, [bookId]: false }));
    }
  };

  return (
    <div className="font-poppins w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ top: '70px' }} // Adjust this value as needed
      />
      <div className="text-xl m-4 h-8 font-semibold text-black">Library</div>

      {loading ? (
        <Library_Skeleton />
      ) : noCourses ? (
        <div className="m-4 text-xl flex justify-center items-center text-red-600">
          You have not enrolled in any courses.
        </div>
      ) : (
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white m-4 p-4 rounded-lg shadow-xl w-[90%] flex flex-col space-y-4"
          >
            <h2 className="text-base font-semibold">Select Course</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="course"
                  value=""
                  checked={selectedCourse === ""}
                  onChange={() => handleSelect("")}
                  className="mr-2"
                />
                All Courses
              </label>
              {courses.map((course) => (
                <label key={course.courseName} className="flex items-center">
                  <input
                    type="radio"
                  name="course"
                  value={course.courseName}
                  checked={selectedCourse === course.courseName}
                  onChange={() => handleSelect(course.courseName)}
                  className="mr-2"
                />
                {course.courseName}
              </label>
              ))}
            </div>
          </form>

          {noMaterials ? (
            <div className="m-4 text-xl flex justify-center item-center text-red-600">
              No materials found.
            </div>
          ) : (
            <div className="w-full px-6 flex flex-wrap gap-6 justify-start items-start">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="h-56 w-[250px] bg-[#F4F5FB] rounded-lg shadow-xl flex flex-col justify-start items-start gap-4 p-6"
                >
                  <div className="h-36 w-[200px] bg-gray-200 overflow-hidden">
                    <img
                      src={Book1}
                      alt={book.fileName}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="text-sm">{book.fileName}</div>
                  <div className="flex justify-between w-full">
                    <div className="flex w-max[70px] flex-col gap-2">
                      <div className="text-sm">{book.description}</div>
                    </div>
                    <div>
                      {downloadingBooks[book._id] ? (
                        <div className="spinner"></div>
                      ) : (
                        <MdDownloadForOffline
                          onClick={() => handleDownload(book._id)}
                          className="w-8 h-8 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
