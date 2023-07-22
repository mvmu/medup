import React from "react";
// import useNavigate and useLocation to change location passing data
import { useNavigate, useLocation } from 'react-router-dom';
// import component
import EditAppointmentPanel from "../../components/appointments/EditAppointmentPanel.jsx";
// import assets
import arrowLeftIcon from '../../assets/usability/arrow-left-circle.svg';


const EditAppointmentPage = () => {
    // constant to read the state during navigation
    const location = useLocation();
    // constant to navigate passing data
    const navigate = useNavigate();
    // constant to asign the appointment passed through state
    const appointment = location !== null && location.state != null ? location.state.appointment : null;
    const isDoctor = location !== null && location.state != null ? location.state.isDoctor : null;
    // function to go back
    function goBack(){
        // one step back in the url
        navigate("/");
    }

    return (
        <>
        <div className="container-fluid pt-5">
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-md-2">
                        {/* button Home with an arrow */}
                        <button
                        type="button"
                        className="btn btn-primary d-flex justify-content-evenly align-items-center"
                        id="buttonBack"
                        onClick={goBack}
                        >
                        <img src={arrowLeftIcon} className="text-white p-2" alt="arrow left"/>
                            Home
                        </button>
                    </div> 
                </div>
                {/* Page title */}
                <div className="row pt-2">
                    <h2>Edit appointment panel</h2>
                </div>
            </div>
        </div>
        {/* conditional to show the panel or an alert */}
            {appointment ? <EditAppointmentPanel appointment={appointment} isDoctor={isDoctor}/> : 
            <div className="container p-5">
                <div className="row">
                    <div className="alert alert-danger" role="alert">
                    You didn't select any appointment, please come back to Home 
                        <div className="row pt-3 justify-content-center">
                            {/* button to go back */}
                            <button
                            className="btn btn-primary w-25"
                            onClick={goBack}
                            >
                                Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )


}

export default EditAppointmentPage