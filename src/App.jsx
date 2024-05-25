import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomeRoutes from './routes/HomeRoutes';

function App() {
  const [count, setCount] = useState(0)





  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<HomeRoutes/>} />
        </Routes>

      </Router>
    </>
  )
}

export default App
