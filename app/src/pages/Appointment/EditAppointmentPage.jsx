import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./EditAppointmentPage.css";
import EditAppointmentPanel from "../../components/appointments/EditAppointmentPanel.jsx";
import arrowLeftIcon from '../../assets/usability/arrow-left-circle.svg';


const EditAppointmentPage = () => {
    // a constant to read the state during navigation
    const location = useLocation();
    const navigate = useNavigate();
    // a constant to asign the appointment passed through state
    const appointment = location !== null && location.state != null ? location.state.appointment : null;
    const isDoctor = location !== null && location.state != null ? location.state.isDoctor : null;

    function goBack(){
        //to go back by one step in the url
        navigate("/");
    }

 
    return (
        <>
        <div className="container-fluid">
            <div className="container-fluid pt-5">
                <div className="row">
                    <button
                        type="button"
                        className="btn btn-primary col-md-1"
                        id="buttonBack"
                        onClick={goBack}
                        >
                        <img src={arrowLeftIcon} className="text-white p-2" alt="arrow left"/>
                            Home
                    </button>
                </div>
                <div className="row pt-2">
                    <h2>Edit appointment panel</h2>
                </div>
            </div>
                
        </div>
            {appointment ? <EditAppointmentPanel appointment={appointment} isDoctor={isDoctor}/> : 
            
            <div className="container p-5">
                <div className="row">
                    <div className="alert alert-danger" role="alert">
                    You didn't select any appointment, please come back to Home
                        <div className="row pt-3 justify-content-center">
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