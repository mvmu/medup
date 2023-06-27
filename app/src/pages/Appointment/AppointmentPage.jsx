import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import "./AppointmentPage.css";
// add passedDoctorId and passedCategoryId as optional parameters, in case we land to this page from the search page/doctor card button
const AppointmentPage = ({loggedUserId}) => {

    //use location is required in case we reach this page from the search doctors page. 
    //In that case the DoctorCard passes the selected doctorId and categoryId in the state during redirect (line: 11 DoctorsCard.jsx)
    const location = useLocation();
    const passedCategoryId = location !== null && location.state != null ? location.state.categoryId : null;
    const passedDoctorId = location !== null && location.state != null ? location.state.doctorId : null;

    //a react component to navigate throught the pages defined in the router (see index.jsx)
    const navigate = useNavigate();

    //data to fetch
    const [categories, setCategories] = useState([]);
    const [doctorsByCategory, setDoctorsByCategory] = useState([]);
    const [doctorAppointmentsSlots, setDoctorAppointmentsSlots] = useState([]);

    //form attributes variables
    const [selectedCategory, setSelectedCategory] = useState(passedCategoryId || null);
    const [selectedDoctor, setSelectedDoctor] = useState(passedDoctorId || null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [patientNote, setPatientNote] = useState("");

    const [appointmentSaved, setAppointmentSaved] = useState(false);


    //hours to book the appointment, from 9AM to 8PM divided by rows
    const hoursGrid = generateTimeGrid();

    // generate a grid putting data into an array
    function generateTimeGrid() {
        const hours = [];
        const rows = [];

        // generate hours from 09:00 AM to 08:00 PM
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

    // use useEffect to reload the component on load and when the selected category value changes in the form 
    useEffect(() => {
        getCategories();
        // if a category is selected...
        if (selectedCategory) {
            // ...fetch all the doctors from the selected category
            getDoctorsByCategory(selectedCategory);
            };
        // if category+doctor+date has been selected...
        if (selectedDoctor && selectedDate) {
            // need to show free time slots as available. 
            // convert the date object into a locale string yyyy-mm-dd format with toLocaleString()
            getOccupiedSlots(selectedDoctor, selectedDate.toLocaleString());
        }
        // if appointmentSaved is true set a timeout to redirect to the homepage in 3 secs
        if (appointmentSaved) {
            setTimeout(() => {
                navigate('/', {replace: true})
            }, 3000);
        }
        }, [selectedCategory, selectedDoctor, selectedDate, appointmentSaved])

    // a function to fetch categories from db using middleware url
    const getCategories = async () => {
        try {
          const response = await fetch("http://localhost:4000/categories");
          // the response from the db will be stored into the constant data
          const data = await response.json();
          //apply the setter function to the result
          setCategories(data);
        }
        catch (error) {
            //print the error if exists
          console.log(error)
        }
    }

    // a function to fetch categories from DB using middleware url
    const getDoctorsByCategory = async (categoryId) => {
            try {
            const response = await fetch(`http://localhost:4000/doctors/${categoryId}`);
            // the response from the DB will be stored into the constant data
            const data = await response.json();
            //apply the setter function to the result
            setDoctorsByCategory(data);
            }
            catch (error) {
                //print the error if exists
                console.log(error)
            }
    }

    //a function to fetch occupied time slots from DB 
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
    // a function to send all the data from the form, just the info we want to store
    async function sendForm() {
        try {
            // fetch the url
            const response = await fetch("http://localhost:4000/appointments", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    patient_id: loggedUserId,
                    doctor_id: selectedDoctor,
                    appointment_date: selectedDate,
                    appointment_time: selectedTime,
                    patient_note: patientNote
                  })
                });

            // if the appointment is saved, update the appointmentSaved boolean variable to true
            if(response.status === 200){
                setAppointmentSaved(true);
            }
        }catch(error){
            console.error(error);
        }
    }
    
      return (
        <>
        <div className="container">
            <form className="p-3">
                <div className="row">
                    {/* use the onChange react callback to store the input value into the selectedCategory variable */}
                    <select defaultValue={null} className="form-select-lg mb-5" aria-label=".form-select-lg"  onChange={e => setSelectedCategory(e.target.value)}>
                        <option value={null}>Select category</option>
                        {/* a map function to check every category and add it to the dropdown as an option, with ID as both key and value props and value as the visible text */}
                        {categories.map(category => 
                                    <option key={category.id} selected={passedCategoryId === category.id} value={category.id}>{category.value}</option>
                                )}
                    </select>
                </div>
                <div className="row">
                    {/* if there isn't a selected category, the select input will be disabled */}
                    {/* TODO: solve problems with disabled */}
                    <select defaultValue={null} disabled={!selectedCategory} className="form-select-lg mb-5" aria-label=".form-select-lg" onChange={e => setSelectedDoctor(e.target.value)}>
                        <option value={null}>Select doctor</option>
                        {/* a map function to check every category and add it to the dropdown as an option, with ID as both key and value props and value as the visible text */}
                        {doctorsByCategory.map(doctor => 
                                        <option key={doctor.id} selected={passedDoctorId === doctor.id} value={doctor.id}>{doctor.name} {doctor.surname}</option>
                        )}
                    </select>
                </div>
                <div className="row">
                    <input disabled={!selectedDoctor} type="date" className="form-control" onChange={e => setSelectedDate(e.target.value)}/>
                </div>
                <div className="row">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="row p-2">
                                {hoursGrid.map((row) => row.map((hour, index) => 
                                    <div className="col-md-4 p-2">
                                        <button 
                                        type="button"
                                        value={hour} 
                                        id={index} 
                                        key={index}
                                        disabled={!selectedDoctor || !selectedDate || doctorAppointmentsSlots.includes(hour)} 
                                        className={selectedTime === hour ? "btn btn-primary" : "btn btn-secondary"} 
                                        onClick={e => setSelectedTime(e.target.value)}>
                                            {hour}
                                        </button>
                                    </div>))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-3">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" onChange={e => setPatientNote(e.target.value)}></textarea>
                </div>
                <div className="row p-3">
                    <button type="button" className="btn btn-primary" onClick={e => sendForm()}>Add appointment</button>
                </div>
            </form>

            {/* An alert that is displayed only if appointmentSaved variable is true */}
            {appointmentSaved ? 
            <>
            <div className="alert alert-success" role="alert">
                Your appointment has been received, you have to wait your doctor to confirm it!
            </div>
            </> 
            : <></>}
        </div>
        </>
      );
}


export default AppointmentPage