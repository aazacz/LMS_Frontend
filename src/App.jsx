import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  const apikey = process.env.REACT_APP_API_KEY;
  console.log(`API Key:` + apikey);


  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<div> hello</div>} />
        </Routes>

      </Router>
    </>
  )
}

export default App
