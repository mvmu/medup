import React from "react";
import { useState, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import "./AppointmentsList.css";

const AppointmentsList = ({userId}) => {

    const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:4000/appointments/${userId}`);
      const data = await response.json();
      setAppointments(data);
    }
    catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getAppointments();
  }, [appointments])

  
    return (
        <>
            <div className="container">
              <div className="overflow-auto">
                    {appointments.map(appointment => 
                      <AppointmentCard appointment={appointment} />)
                    }
              </div>   
            </div>
        </>
    );
};

export default AppointmentsList