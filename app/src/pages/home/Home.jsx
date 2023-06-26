import React from "react";
import Button from "../../components/button/Button";
import UserInfo from "../../components/userInfo/UserInfo";
import AppointmentsList from "../../components/appointments/AppointmentsList";
import "./Home.css";

const Home = ({loggedUserId}) => {
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <UserInfo userId={loggedUserId} />
            </div>
            <div className="container">
                <div className="d-flex justify-content-start pt-4 pb-2">
                    <h2>Your next appointments</h2>
                </div>
            <div className="row">
                <AppointmentsList userId={loggedUserId} />
            </div>
            <div className="row">
                <div className="col-md-12 text-center p-2">
                    <a href="/appointment">
                        <Button 
                            className="btn btn-primary"
                            text="Get appointment"
                        />
                    </a>                   
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center p-2">
                  <Button 
                        className="btn btn-light"
                        text="Search doctors"
                    />
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default Home






// const [categories, setCategories] = useState([]);

//   const getCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/categories');
//       const data = await response.json();
//       setCategories(data);
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }
  
  
//   useEffect(() => {
//     getCategories();
//   }, [])
