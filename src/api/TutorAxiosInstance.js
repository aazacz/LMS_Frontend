import  axios      from "axios";
import TutorToken  from "../api/TokenStore/TutorToken"


const baseURL = process.env.REACT_APP_API_URL;


const TutorAxiosInstance = axios.create()


TutorAxiosInstance.interceptors.request.use(function(config){

    config.baseURL = baseURL
    console.log("Interceptor req Send");
    // const Role = "User";

    console.log(`authorization-key ${token}`);
   
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    return config;
},function (error) {
    return Promise.reject(error)
}
)




TutorAxiosInstance.interceptors.response.use(function (response) {
    
  
    console.log ( "response received"  + response.data.message);
    
    if(response.data.message === "TimedOut"){


    }
   return response;

},function (error) {
    return Promise.reject(error);
  })

  export default TutorAxiosInstance