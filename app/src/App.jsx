import React from "react";
// import useState and useEffect to change state and set side effects to the elements
import { useState, useEffect } from "react";
// import a very important component, userSessionContext, to keep the data/context of the user
import UserSessionContext from './context/UserSessionContext';
//import router 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import pages
import Home from './pages/Home/Home';
import SearchPage from './pages/Search/SearchPage';
import AppointmentPage from './pages/Appointment/AppointmentPage';
import EditAppointmentPage from './pages/Appointment/EditAppointmentPage';
import HistoryPage from './pages/Appointment/HistoryPage';
import Login from './pages/Login/Login'
import NotFound from "./pages/Home/NotFound";
// import assets
import NavBar from './components/navbar/NavBar';
import Footer from "./components/footer/Footer";
import { BE_URL } from "./constants.js";
import './App.css';


// add passedDoctorId and passedCategoryId as optional parameters, in case we land to this page from the search page/doctor card button
const App = () => {
    // constant to SET the user
    const [loggedUser, setLoggedUser] = useState({});
    // constant to GET the session of the user 
    const getUserSession = async () => {
        // fetch the user session only if it's not stored
        if (!loggedUser.userId) {
            try {
                // fetch to the url containing the user and the dynamic value of user id
                const response = await fetch(`${BE_URL}/getUserSession`, {
                    method: "GET",
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
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
    };
    // useEffect userSession, loggedUser as a dependency
    useEffect(() => {
        getUserSession();
    }, [loggedUser])

    return (
        loggedUser.userId ?  
        // set the context, depending on the userId
        <UserSessionContext.Provider value={loggedUser} >
            <Router>
                <NavBar />
                <Routes>
                    {/* common routes */}
                    <Route path="/" element={<Home isDoctor={loggedUser.isDoctor}/>} />
                    <Route path="/edit" element={<EditAppointmentPage />} />
                    <Route path="/appointment" element={<AppointmentPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    {/* if its not a doctor, it will also include the Search Page */}
                    { !loggedUser.isDoctor && 
                        <Route path="/search" element={<SearchPage />} />    
                    }
                    {/* 404 */}
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
      </UserSessionContext.Provider>

       : <Login />
    );
}

export default App