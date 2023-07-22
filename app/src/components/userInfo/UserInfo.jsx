import React from "react";
// import usestate and useffect to make changes into several components and apply effects
import { useState, useEffect } from "react";
// use navlink to include inside the buttons the route to the desired page
import { NavLink as Link } from 'react-router-dom';
import { BE_URL } from "../../constants.js";
import "./UserInfo.css";
// import assets
import Button from "../button/Button";

const UserInfo = ({isDoctor}) => {

    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = async () => {
      try {
        // fetch to the url containing the user and the dynamic value of user id
        const response = await fetch(`${BE_URL}/user`, {
          method : "GET",
          headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
          credentials: 'include'
        });
        // wait the response and store it as data with json format
        const data = await response.json();
        setUserInfo(data);
      }
      catch (error) {
        console.log(error)
      }
    }
  // invoke useEffect to fetch user info when the component is ready
  useEffect(() => {
    getUserInfo();
  }, []);

      // a function to format the date, to show just the year, month and day
      const formatDate = (dateString) => {
        // once the userInfo object is fetched
        if (dateString) {
          // find the T index (given by date format in DB)
          const indexToSlice = dateString.indexOf('T');
          // cut the string from the beginning till the T char
          return dateString.substring(0, indexToSlice);
        } else {
          // if not, return an empty string
          return "";
        }
      }
      //a function to translate the registered gender in DB to a more readable value
      const defineGender = (genderLetter) => {
        switch(genderLetter) {
          case "M":
            return "Male";
          case "F":
            return "Female";
          default:
            return "Not specified"
        }
      }

  return (
    <>
        <div className="container py-5" id="userWelcome">
            <h1 className="p-2">Hi {userInfo.name},</h1>
            <h2>How can we help you?</h2>
            <div className="row">
                <div className="col-md-12 text-center pt-3">
                  {/* use the defineContent function to apply depending on the boolean isDoctor*/}
                  {!isDoctor ? 
                  <>
                      <Link to="/appointment">
                        <Button 
                          className="btn btn-primary m-2"
                          text="Get appointment"
                        />
                      </Link> 
                      <Link to="/search">
                        <Button 
                          className="btn btn-light m-2"
                          text="Search doctors"
                        />
                      </Link> 
                  </>
                  :
                  <>
                    <Link to="/history">
                      <Button 
                        className="btn btn-primary m-2"
                        text="Your appointment history"
                      />
                    </Link> 
                  </>
                }        
                </div>
            </div>
        </div>
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center pt-5 pb-2 px-5">
            <h2 className="pb-4">Your information</h2>
            <div className="card py-2 px-5" id="cardInfoUser">
              <div className="container justify-content-start">
                  <div className="row p-2">
                    <div className="col-md-6">
                        <h6>Full name:</h6>
                    </div>
                    <div className="col-md-6">
                      {userInfo.name} {userInfo.surname}
                    </div>
                  </div>
                  <div className="row p-2">
                    <div className="col-md-6">
                      <h6>{!isDoctor ? 'Birth date:' : 'Category:'}</h6>
                    </div>
                    <div className="col-md-6">
                    {!isDoctor ? formatDate(userInfo.birth_date) : userInfo.category}
                    </div>
                  </div>
                  <div className="row p-2">
                    <div className="col-md-6">
                      <h6>{!isDoctor ? 'Gender:' : 'Medical center:'}</h6>
                    </div>
                    <div className="col-md-6">
                      {!isDoctor ? defineGender(userInfo.gender) : userInfo.medical_center}
                    </div>
                  </div>
              </div>   
            </div>    
          </div>
        </div>

    </>
);
};



export default UserInfo
