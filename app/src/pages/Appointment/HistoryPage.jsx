import React, { useState, useEffect, useContext } from "react";
// import user session context to get the environment
import UserSessionContext from '../../context/UserSessionContext';
// import assets
import AppointmentCard from "../../components/appointments/AppointmentCard";
import { BE_URL } from "../../constants.js";
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
      const response = await fetch(`${BE_URL}/appointments/history`, {
        method: "GET",
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
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

  const showAlert = (appointmentStatus) => {
    return (
        <div className="alert alert-primary m-5 p-3" role="alert">
            {`No ${appointmentStatus} appointments found`}
        </div> 
    )
  }

  return (
    <>
        <div className="accordion pt-5 mt-2 justify-content-center" id="accordion">
            {/* title and subtitle */}
            <h2 className="pt-5">Your appointment history so far</h2>
            <h5 className="pb-5">Just click on the status</h5>
            {/* pending section */}
            <div className="card customBorder">
                <div className="card-header px-0" id="headingPending">
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
                    <div className="card-body row justify-content-center px-5 mx-5">
                        {pendingAppointments.length > 0 ? pendingAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        ) : showAlert('pending')}
                    </div>
                </div>
            </div>
            {/* confirmed section */}
            <div className="card customBorder">
                <div className="card-header px-0" id="headingConfirmed">
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
                    <div className="card-body row justify-content-center px-5 mx-5">
                        {confirmedAppointments.length > 0 ? confirmedAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        ) : showAlert('confirmed')}
                    </div>
                </div>
            </div>
            {/* completed section */}
            <div className="card customBorder">
                <div className="card-header px-0" id="headingCompleted">
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
                    <div className="card-body row justify-content-center px-5 mx-5">
                        {completedAppointments.length > 0 ? completedAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        ) : showAlert('completed')}
                    </div>
                </div>
            </div>
            {/* cancelled section */}
            <div className="card customBorder">
                <div className="card-header px-0" id="headingCancelled">
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
                    <div className="card-body row justify-content-center px-5 mx-5">
                        {deletedAppointments.length > 0 ? deletedAppointments.map(
                            appointment => <AppointmentCard key={appointment.id} appointment={appointment} isDoctor={isDoctor} readOnly />
                        ) : showAlert('cancelled')}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default HistoryPage;
