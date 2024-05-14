import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUp from '../pages/Signup'
import Dashbard from '../pages/dashboard'
import ImgView from '../pages/Img'
import Login from '../pages/Login'
import AllTickets from '../pages/dashboard/AllTickets'
function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/Dashboard" element={<Dashbard/>}/>
            <Route path="/alltickets" element={<AllTickets/>}/>
        </Routes>
    </Router>
  )
}

export default Routing