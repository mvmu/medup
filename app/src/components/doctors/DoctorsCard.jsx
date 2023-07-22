import React from "react"
// import useNavigate to move from this page to another, passing and updating data
import { useNavigate } from "react-router-dom";
// import assets
import Button from '../button/Button'
import Avatar from '../../assets/doctors/avatar.svg'

// const doctorsCard passed with doctor
const DoctorsCard = ({doctor}) => {

    const navigate = useNavigate();
    // function to navigate to the appointment page with the saved data
    function onDoctorSelected(){
        navigate("/appointment", {state: {doctorId: doctor.id, categoryId:doctor.category_id}});
    }
  
    return (
        <>
            <div className="card m-4 px-0 border-0 col-md-3 shadow" id="card">
                <h4 className="card-header pt-3 border-0" id="cardTitle">{doctor.category_name}</h4>
                <div className="card-body p-4">
                    <h5 key={doctor.id} className="card-title p-2">{doctor.name} {doctor.surname}</h5>
                    <img src={Avatar} alt={doctor.name} />
                    <br />
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