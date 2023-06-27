import React from "react";
import "./AppointmentCard.css";
import completedIcon from '../../assets/status_icons/completed.svg';
import confirmedIcon from '../../assets/status_icons/confirmed.svg';
import pendingIcon from '../../assets/status_icons/pending.svg';

const AppointmentCard = ({appointment}) => {
  
    return (
        <>
            <div className="card m-4" id="card">
                <h4 className="card-header">{appointment.category}</h4>
                <div className="card-body">
                    <h5 className="card-title">{appointment.doctor_name} {appointment.doctor_surname}</h5>
                    {/* clean the date and time format with slice method, to get just the date and time */}
                    <p className="card-text">{appointment.appointment_date.slice(0,10)} {appointment.appointment_time.slice(0,5)}</p>
                    <div className="container rounded" style={{backgroundColor: defineColor(appointment.status)}}>
                        {appointment.status}
                        <img className="mx-2" src={defineIcon(appointment.status)} alt="status icon" />
                    </div>
                </div>
            </div>
        </>
    );
};

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

export default AppointmentCard