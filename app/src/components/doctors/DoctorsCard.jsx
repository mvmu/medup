import React from "react"
import { useNavigate } from "react-router-dom";
import "./DoctorsCard.css"
import Button from '../button/Button'

const DoctorsCard = ({doctor}) => {

    const navigate = useNavigate();

    //
    function onDoctorSelected(){
        navigate("/appointment", {state: {doctorId: doctor.id, categoryId:doctor.category_id}});
    }
  
    return (
        <>
            <div className="card m-4 px-0 border-0 col-md-3 shadow" id="card">
                <h4 className="card-header pt-3 border-0" id="cardTitle">{doctor.category_name}</h4>
                <div className="card-body p-4">
                    <h5 key={doctor.id} className="card-title p-2">{doctor.name} {doctor.surname}</h5>
                    {/* clean the date and time format with slice method, to get just the date and time */}
                    {/* <p className="card-text">{appointment.appointment_date.slice(0,10)} {appointment.appointment_time.slice(0,5)}</p> */}
                    {/* <div className="container rounded" style={{backgroundColor: defineColor(appointment.status)}}>
                        {appointment.status}
                        <img className="mx-2" src={defineIcon(appointment.status)} alt="status icon" />
                    </div> */}
                    <Button 
                        className="btn btn-primary m-2 p-2"
                        text="Book an appointment"
                        onClick={onDoctorSelected}
                    />
                </div>
            </div>
        </>
    );
};

export default DoctorsCard