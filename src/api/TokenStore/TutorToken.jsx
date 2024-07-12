import React from 'react'
import { useSelector } from 'react-redux';


const TutorToken = () => {
    
const token = useSelector((state) => state.TutorDetails.token);

return token
}
export default TutorToken