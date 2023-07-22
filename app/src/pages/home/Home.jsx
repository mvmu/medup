import React from "react";
// import components
import UserInfo from "../../components/userInfo/UserInfo";
import AppointmentsList from "../../components/appointments/AppointmentsList";

const Home = ({isDoctor}) => {
    return (
        <>
        {/* all pages have a padding-top to display correctly, given the fixed-top position of the navbar */}
        <div className="container-fluid pt-5">
            {/* first section */}
            <div className="row">
                <UserInfo isDoctor={isDoctor}/>
            </div>
            {/* second section */}
            <div className="container">
                <div className="d-flex justify-content-start pt-5 pb-2">
                    <h2>Your next appointments</h2>
                </div>
                {/* grid with the list of appointment cards */}
                <div className="row">
                    <AppointmentsList isDoctor={isDoctor} />
                </div>
            </div>
        </div>
        </>
    );
};

export default Home