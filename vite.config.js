import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv";
dotenv.config();





// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  define: {
    "process.env.REACT_APP_API_URL": JSON.stringify( process.env.REACT_APP_API_URL )
 
  },




})
