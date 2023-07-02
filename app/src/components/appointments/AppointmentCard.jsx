import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentCard.css";
import completedIcon from '../../assets/status_icons/completed.svg';
import confirmedIcon from '../../assets/status_icons/confirmed.svg';
import pendingIcon from '../../assets/status_icons/pending.svg';
import editIcon from '../../assets/usability/pen.svg';


const AppointmentCard = ({appointment, isDoctor}) => {

    const navigate = useNavigate();

    //define constants to decide what to be displayed
    const title = !isDoctor ? appointment.category : `${appointment.patient_name} ${appointment.patient_surname}`
    const subtitle = !isDoctor ? `${appointment.doctor_name} ${appointment.doctor_surname}` : null
    const dateTime = `${appointment.appointment_date.slice(0,10)} ${appointment.appointment_time.slice(0,5)}`
    const status = appointment.status

    // a function to navigate to a deeper level - manage the appointment passing the appointment data in the state
    function navigateToEdit(){
        navigate("/edit", {state: {appointment, isDoctor}});
    }
                      
    // return different colors depending on the status with a switch-case
    function defineColor(status) {
        switch (status) {
            case "Completed":
                return "var(--color-utility-info)";
            case "Confirmed":
                return "var(--color-utility-success)";
            case "Pending":
                return "var(--bg-custom)"
            default:
                return "white";
        }
    }
    // return the right icon depending on the status with a switch-case
    function defineIcon(status) {
        switch (status) {
            case "Completed":
                return completedIcon;
            case "Confirmed":
                return confirmedIcon;
            case "Pending":
                return pendingIcon;
            default:
                return null;
        }
    }
  
    return (
        <>
            <div className="card m-5 border-0 glassmorphic shadow" id="card">
                <h4 className="card-header pt-3 border-0" id="cardTitle">
                    {title}
                    <img className="mx-2 p-2" 
                        src={editIcon} 
                        alt="edit icon" 
                        onClick={navigateToEdit}
                    />
                </h4>
                <div className="card-body">
                    <h5 className="card-title">{subtitle}</h5>
                    {/* clean the date and time format with slice method, to get just the date and time */}
                    <p className="card-text">{dateTime}</p>
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <div className="container rounded" style={{backgroundColor: defineColor(status)}}>
                                {status}
                                <img className="mx-2 p-2" src={defineIcon(status)} alt="status icon" />
                            </div>
                        </div>
                    </div>                 
                </div>
            </div>
        </>
    );
};



export default AppointmentCard