import React from "react";
// import useState to add state to username,password,isDoctor and error message
import { useState } from "react";
import "./Login.css";
// import assets
import doctor from '../../assets/usability/doctor.svg';
import patient from '../../assets/usability/user.svg';
import bg from '../../assets/brand/bg-login.svg';
import title from '../../assets/brand/title.svg'

const Login = () => {

    // constant to apply useState: username, password and boolean isDoctor
    const [insertedUsername, setInsertedUsername] = useState("");
    const [insertedPassword, setInsertedPassword] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // a function to send all the data from the form, just the info we want to store
    async function loginUser() {
        try {
            // fetch the url
            const response = await fetch("http://localhost:4000/login", {
                method : "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    email : insertedUsername,
                    password : insertedPassword,
                    isDoctor : isDoctor
                  })
                });
            // if OK, it will change window, passing the data
            if(response.status === 200){
                window.location.reload(false);
                // if the authentication has failed (401), send an error message
            } else if (response.status === 401) {
                setErrorMessage("Invalid username or password, try again");
            }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <>
        <div className="container">
            <section className="text-center text-lg-start">
                {/* Jumbotron */}
                <div className="container py-4">
                    <div className="container p-5 d-flex justify-content-center">
                        <img src={title} alt="welcome" id="welcome"/>
                    </div>
                    <div className="row g-0 pt-2 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card cascading-right shadow-sm glassmorphic">
                                <div className="card-body p-5 shadow-5 text-center">
                                    {/* login title */}
                                    <h2 className="mb-5">Log in now</h2>
                                    <form>
                                        {/* create a list with "fake tabs" to simulate two different paths. Actually, it capture a boolean value instead of navigate */}
                                        <ul className="nav nav-tabs nav-justified mb-3" role="tablist">
                                            {/* patient tab */}
                                            <li className="nav-item pointed" role="presentation">
                                                <a 
                                                    className={!isDoctor ? "nav-link active" : "nav-link"} 
                                                    data-mdb-toggle="tab" 
                                                    onClick={e => setIsDoctor(false)} 
                                                    role="tab"
                                                    aria-selected={!isDoctor}
                                                >
                                                    I'm a patient
                                                    <br/>
                                                    <img className="m-2" src={patient} alt="patient icon"/>
                                                </a>
                                            </li>
                                            {/* doctor tab */}
                                            <li className="nav-item pointed" role="presentation">
                                                <a 
                                                    className={isDoctor ? "nav-link active" : "nav-link"} 
                                                    data-mdb-toggle="tab" 
                                                    onClick={e => setIsDoctor(true)} 
                                                    role="tab"
                                                    aria-selected={isDoctor}
                                                >
                                                    I'm a doctor
                                                    <br/>
                                                    <img className="m-2" src={doctor} alt="doctor icon"/>
                                                </a>
                                            </li>
                                        </ul>
                                        {/* Email input */}
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Email address</label>
                                            <input type="email" 
                                                    id="form3Example3" 
                                                    className="form-control" 
                                                    onChange={e => setInsertedUsername(e.target.value)}
                                            />
                                        </div>
                                        {/* Password input */}
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Password</label>
                                            <input type="password" 
                                                    id="form3Example4" 
                                                    className="form-control" 
                                                    onChange={e => setInsertedPassword(e.target.value)}
                                            />
                                        </div>
                                        {/* Submit button */}
                                        <button 
                                            type="button" 
                                            className="btn btn-primary btn-block mb-4 px-5"
                                            onClick={loginUser}>
                                            Log in
                                        </button>
                                        {/* Alert message in case of 401 */}
                                        {errorMessage && (
                                            <div className="alert alert-danger" role="alert">
                                            {errorMessage}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* picture */}
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img 
                            src={bg} 
                            className="w-100 rounded-4 shadow-4"
                            alt="medup background" 
                            id="pictureLogin"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default Login
