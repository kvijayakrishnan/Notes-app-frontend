import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Signup from './pages/SignUp/SignUp';




const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home />}/>
      <Route path='/' exact element={<Login />}/>
      <Route path='/signup' exact element={<Signup />}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>{routes}</div>
  )
}

export default App