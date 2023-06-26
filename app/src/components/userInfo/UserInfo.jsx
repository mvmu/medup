import React from "react";
import { useState, useEffect } from "react";
import "./UserInfo.css";

const UserInfo = ({userId}) => {

    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/${userId}`);
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
            <div className="container pt-4 pb-5" id="userWelcome">
                <h1 className="pt-5">Hi {userInfo.name},</h1>
                <h2>How can we help you?</h2>
            </div>
        </>
    );
};

export default UserInfo
