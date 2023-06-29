import React from "react";
import UserInfo from "../../components/userInfo/UserInfo";
import AppointmentsList from "../../components/appointments/AppointmentsList";
import "./Home.css";

const Home = ({isDoctor}) => {
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <UserInfo />
            </div>
            <div className="container">
                <div className="d-flex justify-content-start pt-4 pb-2">
                    <h2>Your next appointments</h2>
                </div>
            <div className="row">
                <AppointmentsList />
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
