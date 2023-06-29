import React from "react";
import { useState, useEffect } from "react";
import { NavLink as Link } from 'react-router-dom';
import "./UserInfo.css";
import Button from "../button/Button";

const UserInfo = () => {

    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = async () => {
      try {
        // fetch to the url containing the user and the dynamic value of user id
        const response = await fetch(`http://localhost:4000/user`, {
          method : "GET",
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
  }, [userInfo])

  
    return (
        <>
            <div className="container pt-4 pb-2" id="userWelcome">
                <h1 className="p-2">Hi {userInfo.name},</h1>
                <h2>How can we help you?</h2>
                <div className="row">
                    <div className="col-md-12 text-center p-2">
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
                    </div>
                </div>
                <div className="row">
                    
                </div>
            </div>
        </>
    );
};

export default UserInfo
