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
              <div className="overflow-auto">
                    {appointments.map(appointment => 
                      <AppointmentCard appointment={appointment} isDoctor={isDoctor}/>)
                    }
              </div>   
            </div>
        </>
    );
};

export default AppointmentsList