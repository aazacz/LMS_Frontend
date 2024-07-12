import React from 'react'
import { useSelector } from 'react-redux';


const AdminToken  = () => {
    
const token = useSelector((state) => state.AdminDetails.token);
return token
}
export default AdminToken