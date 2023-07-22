import React from "react";
// useNavigate is really important here, to manage appoinments correctly
import { useNavigate } from "react-router-dom";
// import useState to change the status of the card: expanded, !expanded
import { useState } from "react";
// import the card in order to populate the list
import "./AppointmentCard.css";
// import icons
import completedIcon from '../../assets/status_icons/completed.svg';
import confirmedIcon from '../../assets/status_icons/confirmed.svg';
import pendingIcon from '../../assets/status_icons/pending.svg';
import cancelledIcon from '../../assets/status_icons/cancel.svg';
import editIcon from '../../assets/usability/pen.svg';
import upIcon from '../../assets/usability/up.svg'
import downIcon from '../../assets/usability/down.svg'


const AppointmentCard = ({appointment, isDoctor, readOnly}) => {
    // useNavigate() in a constant to relocate window passing data through a function
    const navigate = useNavigate();
    // useState to control the card dropdown 
    const [expanded, setExpanded] = useState(false); 


    // define constants to decide what to be displayed

    // constant to show a specific title: category (isDoctor) or patient's complete name(!isDoctor)
    const title = !isDoctor ? appointment.category : `${appointment.patient_name} ${appointment.patient_surname}`
    // constant to store the doctor name and surname, if its not, it wont show anything
    const subtitle = !isDoctor ? `${appointment.doctor_name} ${appointment.doctor_surname}` : null
    // const date = `${appointment.appointment_date.slice(0,10)}`
    const day = `${appointment.appointment_date.slice(8,10)}`
    // constant to store the month, using new Date() and the given date, toLocaleString() to get the textual month, slice() to get the first 3 letters and toUpperCase() to see it better
    const month = new Date(appointment.appointment_date).toLocaleString('default', { month: 'short' }).slice(0, 3).toUpperCase();
    // constant to store just the hour and minutes using slice() 
    const time = `${appointment.appointment_time.slice(0,5)}`
    // constant to store the status
    const status = appointment.status
    // constant to store the patient note
    const patientNote = appointment.patient_note
    // constant to store the doctor note
    const doctorNote = appointment.doctor_note

    // a function to navigate to a deeper level - manage the appointment passing the appointment data in the state
    function navigateToEdit(){
        navigate("/edit", {state: {appointment, isDoctor}});
    }
                      
    // return a color depending on the status with a switch-case
    function defineColor(status) {
        switch (status) {
            case "Completed":
                return "var(--color-utility-info)";
            case "Confirmed":
                return "var(--color-utility-success)";
            case "Pending":
                return "var(--bg-custom)";
            case "Cancelled":
                return "var(--color-utility-danger)"
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
            case "Cancelled":
                return cancelledIcon;
            default:
                return null;
        }
    }
    // return the content of the component
    return (
        <>
            <div className="card m-4 border-0 glassmorphic shadow col-md-5 px-0" id="card">
                {/* card title */}
                <div className="card-header pt-3 border-0" id="cardTitle">
                    <h4>{title}</h4>  
                </div>
                {/* card body */}
                <div className="card-body">
                    {/* a single row into the card body */}
                    <div className="row justify-content-center">
                        <div className="row">
                            {/* column to contain the filtered date */}
                            <div className="col-md-4 border-end pb-2 my-3">
                                {/* clean the date and time format with slice method, to get just the date and time */}
                                <h6 className="card-text">{day}</h6>
                                <h6 className="card-text">{month}</h6>
                            </div>
                            {/* column to contain the doctor/patient name and the time */}
                            <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
                                <h5 className="card-title">
                                    {isDoctor ? appointment.category : subtitle }
                                </h5>
                                <p className="card-text">{time}</p>
                                {/* apply the function defineColor and defineIcon into the body of the card to personalize the label depending on the status */}                           
                            </div> 
                        </div>                      
                        {/* new row to contain the edit button and the status */}
                        <div className="row mt-3 justify-content-center">
                            {/* column to contain edit button */}
                            {!readOnly && <div className="col-md-4 d-flex justify-content-center">
                                <button  
                                    type="button" 
                                    id="buttonEdit"
                                    className="btn btn-outline-secondary btn-sm mb-2" 
                                    // use the function navigateToEdit on click
                                    onClick={navigateToEdit}>
                                    {/* edit icon as an img */}
                                    <img 
                                        src={editIcon} 
                                        alt="edit icon" 
                                    />
                                </button>
                            </div>}
                            {/* column to contain status label */}
                            <div className="col-md-8">
                                <div 
                                    className="container rounded p-1" 
                                    style={{backgroundColor: defineColor(status)}}>
                                    {status}
                                    <img 
                                        className="ms-3" 
                                        src={defineIcon(status)} 
                                        alt="status icon" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>   
                    {/* button to dropdown more info */}
                    {!expanded && (
                        <button
                        className="btn btn custom mt-3"
                        onClick={() => setExpanded(true)}
                        >
                            <img 
                            src={downIcon} 
                            alt="down icon" 
                            />
                        </button>
                    )}
                    {/* show the aditional info when expanded is true */}
                    {expanded && (
                        <div className="mt-3">
                            {/* show doctor or patient note, depending on the user. Then, choose the color */}
                            <h6>{isDoctor ? "Patient" : "Doctor"} note</h6>
                            {isDoctor ? (
                                <p className={patientNote === null || patientNote === "" ? "text-danger" : "text-muted"}>
                                    {patientNote === null  || patientNote === "" ? "No comments yet" : patientNote}
                                </p>
                                ) : (
                                <p className={doctorNote === null || doctorNote === "" ? "text-danger" : "text-muted"}>
                                    {doctorNote === null || doctorNote === "" ? "No comments yet" : doctorNote}
                                </p>
                                )}
                            {/* button to turn to the initial state */}
                            <button
                                className="btn btn custom"
                                onClick={() => setExpanded(false)}
                            >
                                <img 
                                src={upIcon} 
                                alt="up icon" 
                                />
                            </button>
                        </div>
                    )}              
                </div>
            </div>
        </>
    );
};



export default AppointmentCard