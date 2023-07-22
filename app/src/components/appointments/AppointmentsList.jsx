import React from "react";
// import usestate and useffect to apply on the element appointments
import { useState, useEffect } from "react";
// import components
import AppointmentCard from "./AppointmentCard";
import { BE_URL } from "../../constants.js";

const AppointmentsList = ({isDoctor}) => {
  // const to apply changes on appointments
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      // fetch data with get method, applying isDoctor boolean
      const response = await fetch(`${BE_URL}/${isDoctor ? "doctor" : "patient"}/appointments`, {
        method : "GET",
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        credentials: 'include',
      });
      const data = await response.json();
      // set appointments
      setAppointments(data);
    }
    catch (error) {
      console.log(error)
    }
  }
  // apply useffect to the appointments
  useEffect(() => {
    getAppointments();
  }, [])

    return (
        <>
            <div className="container">
              {/* check with a ternary operator if the list passed has at least 1 element. If not, shows an alert message */}
              {appointments.length === 0 ? 
              <div className="container">
                  <div className="alert alert-primary m-5 p-3" role="alert">
                    You don't have any appointments yet. 
                    <div className="row justify-content-center pt-1">
                    Start booking!
                    </div>
                  </div> 
              </div>
              : <div className="row d-flex m-2 justify-content-center">
                    {appointments.map(appointment => 
                      <AppointmentCard appointment={appointment} isDoctor={isDoctor} key={appointment.id}/>)
                    }
              </div>
              }   
            </div>
        </>
    );
};

export default AppointmentsList