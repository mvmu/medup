import React from "react";
// import component 
import DoctorsCard from "./DoctorsCard";

// userId as a parameter to pass the user info. In case of saving an appointment, the data will be stored for this id
const DoctorsList = ({doctors}) => {
   // order doctors by name, ascendent
   const sortedDoctors = doctors.slice().sort((a, b) => a.name.localeCompare(b.name));

    return (
        <>
            <div className="container">
              {/* check with a ternary operator if the list passed has at least 1 element. If not, shows an alert message */}
              {doctors.length === 0 ? 
              <div className="container">
                  <div className="alert alert-danger m-5 p-3" role="alert">Sorry, we couldn't find any doctor that matches your criteria. Try again!</div> 
              </div>
              : (
                <div className="row d-flex m-2 justify-content-center">
                  {/* map to populate the component with one DoctorsCard for each doctor */}
                  {sortedDoctors.map((doctor) => (
                    <DoctorsCard doctor={doctor} key={doctor.id} />
                  ))}
                </div>
              )}
            </div>
        </>
    );
};

export default DoctorsList