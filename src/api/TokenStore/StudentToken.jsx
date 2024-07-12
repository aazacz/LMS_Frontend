import React from 'react'
import { useSelector } from 'react-redux';


const studenttoken = () => {
    
const token = useSelector((state) => state.StudentDetails.token);

return token
}
export default studenttoken