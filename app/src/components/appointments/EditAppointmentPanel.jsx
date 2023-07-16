import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditAppointmentPanel.css";
// import icons
import completedIcon from '../../assets/status_icons/completed.svg';
import confirmedIcon from '../../assets/status_icons/confirmed.svg';
import pendingIcon from '../../assets/status_icons/pending.svg';

const EditAppointmentPanel = ({appointment, isDoctor}) => {
    const navigate = useNavigate();

    //define constants to decide what to be displayed
    const title = !isDoctor ? appointment.category : `${appointment.patient_name} ${appointment.patient_surname}`
    const subtitle = !isDoctor ? `${appointment.doctor_name} ${appointment.doctor_surname}` : null
    const date = appointment.appointment_date.slice(0,10);
    const time = appointment.appointment_time.slice(0,5);
    const status = appointment.status;

    // form attributes variables
    const [changedDate, setChangedDate] = useState(date);
    const [changedTime, setChangedTime] = useState(time);
    const [changedPatientNote, setChangedPatientNote] = useState(appointment.patient_note);
    const [changedDoctorNote, setChangedDoctorNote] = useState(appointment.doctor_note);
    
    const [doctorAppointmentsSlots, setDoctorAppointmentsSlots] = useState([]);
    const [appointmentUpdated, setAppointmentUpdated] = useState(false);
    const [appointmentCancelled, setAppointmentCancelled] = useState(false);
    
    // hours to book the appointment, from 9AM to 8PM divided by rows
    const hoursGrid = generateTimeGrid();

    // generate a grid putting data into an array
    function generateTimeGrid() {
        const hours = [];
        const rows = [];

        // generate hours from 9:00 AM to 8:00 PM
        for (let hour = 9; hour <= 20; hour++) {
            const date = new Date();
            date.setHours(hour, 0, 0); // Set the hour and minutes in the Date object
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            hours.push(formattedTime);
        }// choose how many elements(hours) we want to show in each row
          const elementsPerRow = 3;
          for (let i = 0; i < hours.length; i += elementsPerRow) {
            rows.push(hours.slice(i, i + elementsPerRow));
          
        }
        return rows;
      }

    // a function to fetch occupied time slots from DB 
    const getOccupiedSlots = async (doctorId, date) => {
        try {
        const response = await fetch(`http://localhost:4000/appointments/occupied/${doctorId}/${date}`);
        // the response from the db will be stored into the constant data
        const data = await response.json();
        //apply the setter function to the result
        setDoctorAppointmentsSlots(data);
        }
        catch (error) {
            //print the error if exists
            console.log(error)
        }
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

     // a function to send all the data from the form, just the info we want to store
     async function update() {
        try {
            // fetch the url
            const response = await fetch("http://localhost:4000/appointment/update", {
                method : "PUT",
                // if this key is not passed with include as a value, the session won't be recognized in the backend
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    appointment_id: appointment.id,
                    new_date: changedDate,
                    new_time: changedTime,
                    patient_note: changedPatientNote,
                    doctor_note: changedDoctorNote,
                    // if the update is made by a doctor, it confirms the appointment (status id 2:confirmed). Otherwise, even if the appointment has already been confirmed by a doctor, any change made by the patient set the status back to 1
                    new_status_id: isDoctor ? 2 : 1
                  })
                });

            // if the appointment is saved, update the appointmentSaved boolean variable to true
            if(response.status === 200){
                setAppointmentUpdated(true);
                setTimeout(() => {
                        navigate('/', {replace: true})
                    }, 2000);
            }
        }catch(error){
            console.error(error);
        }
    }

    // a function to delete the appointment in front side
     async function cancel() {
        try {
            // fetch the url
            const response = await fetch(`http://localhost:4000/appointment/cancel/${appointment.id}`, {
                method : "PUT",
                // if this key is not passed with include as a value, the session won't be recognized in the backend
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    appointment_id: appointment.id,
                    // we must modify the object status id value as 3 (cancelled)
                    new_status_id: 3
                  })
                });

            // if the appointment is cancelled, update the appointmentCancelled boolean variable to true
            if(response.status === 200){
                setAppointmentCancelled(true);
                setTimeout(() => {
                    navigate('/', {replace: true})
                }, 2000);
            }
        }catch(error){
            console.error(error);
        }
    }



    useEffect(() => {
        getOccupiedSlots(appointment.doctor_id,changedDate);
        }, [changedDate]) // an array to define the dependencies for which the content inside useEffect must be re-executed if one of those dependencies change

  
    return (
        <>
        <div className="container">
            <div className="card m-5 border-0 glassmorphic shadow" id="card">
                    <h4 className="card-header pt-3 border-0" id="cardTitle">
                        {title}
                    </h4>
                    <div className="card-body">
                        <h5 className="card-title">{subtitle}</h5>
                        <h6 className="pt-4">Date</h6>
                        {/* clean the date and time format with slice method, to get just the date and time */}
                        {/* the previously scheduled date will appear automatically */}
                        <input type="date" 
                                className="form-control-md bg-light border-0 shadow-sm"
                                value={changedDate} 
                                disabled={isDoctor || appointmentUpdated || appointmentCancelled}  
                                onChange={e => setChangedDate(e.target.value)} 
                        />
                        {/* hours grid */}
                        <h6 className="pt-4">
                            Time slots 
                        </h6>
                        <div className="row pt-1">
                                {hoursGrid.map((row) => row.map((hour, index) => 
                                    <div className="col-md-4 p-2">
                                        <button 
                                            type="button"
                                            value={hour} 
                                            id={index} 
                                            key={index}
                                            disabled={doctorAppointmentsSlots.includes(hour) || isDoctor || appointmentUpdated || appointmentCancelled} 
                                            className={changedTime === hour ? "btn btn-primary w-50 shadow-sm" : "btn btn-light w-50 shadow-sm"} 
                                            onClick={e => setChangedTime(e.target.value)}
                                        >
                                            {hour}
                                        </button>
                                    </div>))}
                        </div>
                        <h6 className="pt-4">
                            Patient notes
                        </h6>
                        {/* patient note */}
                        <div className="row p-3">
                            <textarea 
                                value={changedPatientNote || ""}
                                disabled={isDoctor || appointmentUpdated || appointmentCancelled} 
                                className="form-control-lg shadow-sm bg-light" 
                                placeholder="Leave a comment here" 
                                onChange={e => setChangedPatientNote(e.target.value)}
                            />
                        </div>
                         {/* doctor note */}
                         <h6 className="pt-4">
                            Doctor notes
                        </h6>
                        <div className="row p-3">
                            <textarea 
                                value={changedDoctorNote || ""}
                                disabled={!isDoctor || appointmentUpdated || appointmentCancelled} 
                                className="form-control-lg shadow-sm bg-light" 
                                placeholder="Leave a comment here" 
                                onChange={e => setChangedDoctorNote(e.target.value)}
                            />
                        </div>
                        {/* status */}
                        {/* status */}
                        <h6 className="pt-4">
                            Status
                        </h6>
                        <div className="container rounded" style={{backgroundColor: defineColor(status)}}>
                            {status}
                            <img className="mx-2 p-2" src={defineIcon(status)} alt="status icon" />
                        </div>
                        {/* save changes / delete appointment */}
                        <div className="row p-3">
                            {/* update appointment if the user is a patient. - change status to 1 (pending). If its a doctor instead, change to 2 (confirmed) */}
                            <div className="col-md-6">
                                <button type="button" 
                                    className="btn btn-primary"
                                    onClick={update}
                                    // a composed boolean condition. If nothing has changed, then the button will be disabled
                                    disabled={
                                        (!isDoctor && changedDate === date && changedTime === time && changedPatientNote === appointment.patient_note && changedDoctorNote === appointment.doctor_note) || appointmentUpdated || appointmentCancelled}
                                >
                                    {isDoctor ? "Confirm appointment" : "Update appointment"}
                                </button>
                            </div>
                            {/* delete appointment - change status to 3(cancelled) */}
                            <div className="col-md-6">
                                <button type="button" 
                                        className="btn btn-danger"
                                        onClick={cancel}
                                        disabled={appointmentUpdated || appointmentCancelled}>
                                            Delete appointment
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* An alert that is displayed only if appointmentSaved variable is true */}
                    {appointmentUpdated ? 
                    <>
                    <div className="alert alert-success m-3" role="alert">
                        Your appointment has been updated succesfully!
                        <div className="row justify-content-center">
                            You will be redirected to Home
                        </div>
                        <div className="spinner-border text-light mt-3" role="status"/>
                    </div>
                    </> 
                    : <></>}
                    {/* end of conditional */}
                    {/* An alert that is displayed only if appointmentCancelled variable is true */}
                    {appointmentCancelled ? 
                    <>
                    <div className="alert alert-success m-3" role="alert">
                        Your appointment has been cancelled succesfully!
                        <div className="row justify-content-center">
                            You will be redirected to Home
                        </div>
                        <div className="spinner-border text-light mt-3" role="status"/>
                    </div>
                    </> 
                    : <></>} 
                    {/* end of conditional */}
            </div>
        </div>
            
        </>
    );
};



export default EditAppointmentPanel