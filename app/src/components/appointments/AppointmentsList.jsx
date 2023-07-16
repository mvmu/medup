import React from "react";
import { useState, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import "./AppointmentsList.css";

const AppointmentsList = ({isDoctor}) => {

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:4000/${isDoctor ? "doctor" : "patient"}/appointments`, {
        method : "GET",
        credentials: 'include',
      });
      const data = await response.json();
      setAppointments(data);
    }
    catch (error) {
      console.log(error)
    }
  }
  
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
                      <AppointmentCard appointment={appointment} isDoctor={isDoctor}/>)
                    }
              </div>
              }   
            </div>
        </>
    );
};

export default AppointmentsList