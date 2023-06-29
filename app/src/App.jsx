import React from "react";
import { useState, useEffect } from "react";
import './App.css';
//import pages
import Home from './pages/Home/Home/';
import SearchPage from './pages/Search/SearchPage';
import AppointmentPage from './pages/Appointment/AppointmentPage';
import Login from './pages/Login/Login'
import NavBar from './components/navbar/NavBar';
//import router 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// add passedDoctorId and passedCategoryId as optional parameters, in case we land to this page from the search page/doctor card button
const App = () => {

    const [loggedUser, setLoggedUser] = useState({});

    const getUserSession = async () => {
        try {
            // fetch to the url containing the user and the dynamic value of user id
            const response = await fetch(`http://localhost:4000/getUserSession`, {
                method: "GET",
                credentials: "include",
            });
            // wait the response and store it as data with json format
            if (response.status === 200) {
                const data = await response.json();
                setLoggedUser(data);
            } else {
                console.log("No session found");
            }
            }
            catch (error) {
            console.log(error)
            }
    }


    useEffect(() => {
        getUserSession();
    }, [])
        
    return (
        loggedUser.userId ?  <Router>
            <NavBar />
            { loggedUser.isDoctor ? 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/appointment" element={<AppointmentPage />} />
                </Routes>
            :
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            </Routes>
        }
      </Router> : <Login />
    );
}


export default App