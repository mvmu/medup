import React, { useState, useEffect, useContext } from "react";
import UserSessionContext from '../../context/UserSessionContext';
import AppointmentCard from "../../components/appointments/AppointmentCard";
import "./HistoryPage.css";

const HistoryPage = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [deletedAppointments, setDeletedAppointments] = useState([]);

  const sessionUser = useContext(UserSessionContext);
  const isDoctor = sessionUser.isDoctor;

  const getAppointments = async () => {
    try {
      const response = await fetch("http://localhost:4000/appointments/history", {
        method: "GET",
        credentials: 'include',
      });
      const data = await response.json();
      // separate the result into different sublists
      setPendingAppointments(data.filter(elem => elem.status === "Pending"));
      setConfirmedAppointments(data.filter(elem => elem.status === "Confirmed"));
      setCompletedAppointments(data.filter(elem => elem.status === "Completed"));
      setDeletedAppointments(data.filter(elem => elem.status === "Cancelled"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // Function to generate AppointmentCards for a given status
  const renderAppointmentCards = (appointments) => {
    return appointments.map(appointment => (
      <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} />
    ));
  };

  return (
    <>
        <div className="accordion pt-5 mt-2" id="accordion">
            {/* title and subtitle */}
            <h2 className="pt-5">Your appointment history so far</h2>
            <h5 className="pb-5">Just click on the status</h5>
            <div className="card">
                {/* pending section */}
                <div className="card-header" id="headingPending">
                    <h5 className="mb-0">
                        <button 
                        className="btn btn" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#collapsePending" 
                        aria-expanded="true" 
                        aria-controls="collapsePending">
                            <h5>Pending appointments</h5>
                        </button>
                    </h5>
                </div>
                {/* collapsing */}
                <div 
                id="collapsePending" 
                className="collapse" 
                aria-labelledby="headingPending" 
                data-parent="#accordion">
                    <div className="card-body row justify-content-center">
                        {pendingAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        )}
                    </div>
                </div>
            </div>
            {/* confirmed section */}
            <div className="card">
                <div className="card-header" id="headingConfirmed">
                    <h5 className="mb-0">
                        <button 
                        className="btn btn" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#collapseConfirmed" 
                        aria-expanded="true" 
                        aria-controls="collapseConfirmed">
                            <h5>Confirmed appointments</h5>
                        </button>
                    </h5>
                </div>
                {/* collapsing */}
                <div id="collapseConfirmed" className="collapse" aria-labelledby="headingConfirmed" data-parent="#accordion">
                    <div className="card-body row justify-content-center">
                        {confirmedAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        )}
                    </div>
                </div>
            </div>
            {/* completed section */}
            <div className="card">
                <div className="card-header" id="headingCompleted">
                    <h5 className="mb-0">
                        <button 
                        className="btn btn" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#collapseCompleted" 
                        aria-expanded="true" 
                        aria-controls="collapseCompleted">
                            <h5>Completed appointments</h5>
                        </button>
                    </h5>
                </div>
                {/* collapsing */}
                <div 
                id="collapseCompleted" 
                className="collapse" 
                aria-labelledby="headingCompleted" 
                data-parent="#accordion">
                    <div className="card-body row justify-content-center">
                        {completedAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        )}
                    </div>
                </div>
            </div>
            {/* cancelled section */}
            <div className="card">
                <div className="card-header" id="headingCancelled">
                    <h5 className="mb-0">
                        <button 
                        className="btn btn" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#collapseCancelled" 
                        aria-expanded="true" 
                        aria-controls="collapseCancelled">
                            <h5>Cancelled appointments</h5>
                        </button>
                    </h5>
                </div>
                {/* collapsing */}
                <div 
                id="collapseCancelled" 
                className="collapse" 
                aria-labelledby="headingCancelled" 
                data-parent="#accordion">
                    <div className="card-body row justify-content-center">
                        {deletedAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default HistoryPage;
