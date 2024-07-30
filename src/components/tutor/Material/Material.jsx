import React, { useState, useEffect, useRef } from 'react'
import './Material.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { TutorAxiosInstance } from '../../../routes/TutorRoutes'
const Material = () => {
    const input = useRef()
    const thumbnail = useRef()
    const baseUrl = process.env.REACT_APP_API_URL
    const [materialName, setMaterialName] = useState('')
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState('')
    const [description, setDescription] = useState('')
    const [fileName, setFileName] = useState('')
    const [tfileName, settFileName] = useState('')
    const [file, setFile] = useState(null)
    const [tfile, settFile] = useState(null)
    const [error, setError] = useState('')
    

    const [materialNameError, setMaterialNameError] = useState('')
    const [coursesNameError, setCoursesError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [fileError, setFileError] = useState('')
    const [tfileError, settFileError] = useState('')



    useEffect(()=>{
console.log(fileName," fileName")
console.log(file," tfile")
console.log(description," description")
console.log(selectedCourse, "selectedCourse")
    },[fileName,tfile,description,selectedCourse])

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}api/course/get-all-course-name?page=1&pageSize=&search=`
                )
                if (response.status !== 200) {
                    throw new Error('Failed to fetch courses')
                }
                const data = response.data
                console.log('Courses fetched:', data) // Debugging line
                setCourses(data.data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchCourses()
    }, [])

    const handleMaterialNameChange = (e) => {
        setMaterialName(e.target.value)
        setMaterialNameError('')
    }

    const handleCourseChange = (e) => {
        console.log(e.target.value)
        setSelectedCourse(e.target.value)
        setCoursesError('')
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
        setDescriptionError('')
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
        setFileError('')
    }

    const handleThumbnailChange = (e) => {
        settFile(e.target.files[0])
        settFileName(e.target.files[0].name)
        settFileError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let valid = true
        if (!materialName) {
            setMaterialNameError('Material name is required')
            valid = false
        }
        if (!selectedCourse) {
            setCoursesError('Selecting a course is required')
            valid = false
        }
        if (!description) {
            setDescriptionError('Assignment description is required')
            valid = false
        }
        if (!file) {
            setFileError('Please select a file')
            valid = false
        }
        if (!tfile) {
            settFileError('Please select an image')
            valid = false
        }

        if (!valid) return
        const fileName = `${Date.now()}-${file.name}`
        const tfileName = `${Date.now()}-${tfile.name}`
        const formData = new FormData()
        formData.append('materialName', materialName)
        formData.append('courseId', selectedCourse)
        formData.append('description', description)
        formData.append('fileName', fileName)
        formData.append('file', file)
        formData.append('tfileName', tfileName)
        formData.append('tfile', tfile)

        console.log(formData.get('materialName'))
        console.log(formData.get('courseId'))
        console.log(formData.get('description'))
        console.log(formData.get('fileName'))
        console.log(formData.get('file'))
        console.log(formData.get('tfileName'))
        console.log(formData.get('tfile'))

        try {
            console.log(formData.get('materialName'))
            console.log(formData.get('courseId'))
            console.log(formData.get('description'))
            console.log(formData.get('fileName'))
            console.log(formData.get('file'))
            console.log(formData.get('tfileName'))
            console.log(formData.get('tfile'))
            const response = await TutorAxiosInstance.post(
                `api/library/upload-course-material`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'},
                }
            )
            
            if (response.data.message === 'Material Uploaded Successfully') {
                Swal.fire({
                    icon: 'success',
                    title: 'Material created successfully',
                })

                setMaterialName('')
                setSelectedCourse('')
                setDescription('')
                setFile(null)
                setFileName('')
                settFile(null)
                settFileName('')
                input.current.value = ''
                thumbnail.current.value = ''
            }
            console.log(response.data)
        } catch (error) {
            console.error('Error creating material:', error)
        }
    }

    return (
        <form className="new-material-container" onSubmit={handleSubmit}>
            <p className="new-material-title">New Material</p>
            <div className="time-container flex">
                <div className="new-material-duration">
                    <p className="new-material-instruction">
                        Name of the Material
                    </p>
                    <input
                        type="text"
                        className="new-material-select"
                        placeholder="Enter Material Name"
                        value={materialName}
                        onChange={handleMaterialNameChange}
                    />
                    {materialNameError && (
                        <p className="text-red-500 text-sm">
                            {materialNameError}
                        </p>
                    )}
                </div>
            </div>
            <p className="new-assignment-instruction">Select Course</p>
            <select
                name="course-names"
                id="course-names"
                className="new-material-select"
                value={selectedCourse}
                onChange={handleCourseChange}
            >
                <option value="" disabled>
                    Select a Course
                </option>
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                        {course.courseName}
                    </option>
                ))}
            </select>
            {coursesNameError && (
                <p className="text-red-500 text-sm">{coursesNameError}</p>
            )}
            <p className="new-material-instruction">Description</p>
            <textarea
                name="postContent"
                className="new-material-name"
                placeholder="Enter Material Description"
                rows={4}
                cols={40}
                value={description}
                onChange={handleDescriptionChange}
            />
            {descriptionError && (
                <p className="text-red-500 text-sm">{descriptionError}</p>
            )}
            <div className="material-files flex">
                <div className="new-material-duration">
                    <p className="new-material-instruction">Select Files</p>
                    <div className="material-file-input">
                        <input
                            ref={input}
                            type="file"
                            className="material-btn"
                            id="file-upload"
                            accept=".pdf, .docx, .doc"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-upload"
                            className="file-input-material-button"
                        >
                            Browse
                        </label>
                    </div>
                    {fileError && (
                        <p className="text-red-500 text-sm">{fileError}</p>
                    )}
                </div>
                <div className="new-material-duration">
                    <p className="new-material-instruction">Upload Thumbnail</p>
                    <div className="material-file-input">
                        <input
                            ref={thumbnail}
                            type="file"
                            className="material-btn"
                            id="thumbnail-upload"
                            accept=".jpg, .png, .jpeg"
                            onChange={handleThumbnailChange}
                        />
                        <label
                            htmlFor="thumbnail-upload"
                            className="file-input-material-button"
                        >
                            Browse
                        </label>
                    </div>
                    {tfileError && (
                        <p className="text-red-500 text-sm">{tfileError}</p>
                    )}
                </div>
            </div>
            <button type="submit" className="create-material">
                Create Material
            </button>
        </form>
    )
}

export default Material
