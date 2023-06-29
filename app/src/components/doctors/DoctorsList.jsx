import React from "react";
import DoctorsCard from "./DoctorsCard";
import "./DoctorsList.css";

// userId as a parameter to pass the user info. In case of saving an appointment, the data will be stored for this id
const DoctorsList = ({doctors}) => {
    return (
        <>
            <div className="container">
              {/* check with a ternary operator if the list passed has at least 1 element. If not, shows an alert message */}
              {doctors.length === 0 ? 
              <div className="container">
                  <div className="alert alert-danger m-5 p-3" role="alert">Sorry, we couldn't find any doctor that matches your criteria</div> 
              </div>
              : <div className="row d-flex justify-content-center">
                    {doctors.map(doctor => 
                      <DoctorsCard doctor={doctor} key={doctor.id}/>)
                    }
              </div> 
              }
            </div>
        </>
    );
};

export default DoctorsList