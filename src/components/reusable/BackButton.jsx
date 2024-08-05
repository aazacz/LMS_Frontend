import React from "react"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"


const BackButton = ({style})=>{


const navigate = useNavigate()


return(
<>

<IoArrowBackCircleOutline className={`${style}`} onClick={()=> navigate(-1)} />


</>


)



}

export default BackButton