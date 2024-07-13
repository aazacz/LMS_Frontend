import  axios  from "axios";



const baseURL = process.env.REACT_APP_API_URL;


export const axiosInstanceStudent = axios.create()


axiosInstanceStudent.interceptors.request.use(function(config){

    config.baseURL = baseURL
    console.log("Interceptor req Send");
    const Role = "User";

    console.log(`authorization-key ${token}`);
   
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    return config;
},function (error) {
    return Promise.reject(error)
}
)




axiosInstanceStudent.interceptors.response.use(function (response) {
    
  
    console.log ( "response received"  + response.data.message);
    
    if(response.data.message === "TimedOut"){
         Cookies.remove('UserjwtCookie')
        }
   return response;

},function (error) {
    return Promise.reject(error);
  })

  export default axiosInstanceStudent