import React from "react";
import { useState } from "react";
import doctor from '../../assets/usability/doctor.svg';
import patient from '../../assets/usability/user.svg';
import bg from '../../assets/brand/bg-login.svg';
import title from '../../assets/brand/title.svg'



import "./Login.css";

const Login = () => {

    const [insertedUsername, setInsertedUsername] = useState("");
    const [insertedPassword, setInsertedPassword] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);


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

            if(response.status === 200){
                window.location.reload(false);
            }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <>
        <div className="container">
        <section className="text-center text-lg-start">
            {/* <!-- Jumbotron --> */}
            <div className="container py-4">
                <div className="container p-5 d-flex justify-content-center">
                    <img src={title} alt="welcome"/>
                </div>
                <div className="row g-0 pt-4 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className="card cascading-right shadow-sm glassmorphic">
                        <div className="card-body p-5 shadow-5 text-center">
                            <h2 className="mb-5">Log in now</h2>
                            <form>
                                {/* create a list with "fake tabs" to simulate two different paths. Actually, it capture a boolean value instead of navigate */}
                                <ul className="nav nav-tabs nav-justified mb-3" role="tablist">
                                    <li className="nav-item pointed" role="presentation">
                                        <a className={!isDoctor ? "nav-link active" : "nav-link"} data-mdb-toggle="tab" onClick={e => setIsDoctor(false)} role="tab"
                                        aria-selected={!isDoctor}>
                                            I'm a patient
                                            <img className="m-2" src={patient} alt="patient icon"/>
                                        </a>
                                    </li>
                                    <li className="nav-item pointed" role="presentation">
                                        <a className={isDoctor ? "nav-link active" : "nav-link"} data-mdb-toggle="tab" onClick={e => setIsDoctor(true)} role="tab"
                                        aria-selected={isDoctor}>
                                            I'm a doctor
                                            <img className="m-2" src={doctor} alt="doctor icon"/>
                                        </a>
                                    </li>
                                </ul>
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label">Email address</label>
                                    <input type="email" 
                                            id="form3Example3" 
                                            className="form-control" 
                                            onChange={e => setInsertedUsername(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label">Password</label>
                                    <input type="password" 
                                            id="form3Example4" 
                                            className="form-control" 
                                            onChange={e => setInsertedPassword(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Submit button --> */}
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-block mb-4 px-5"
                                    onClick={loginUser}>
                                    Log in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <img src={bg} className="w-100 rounded-4 shadow-4"
                    alt="medup background" />
                </div>
                </div>
            </div>
            {/* <!-- Jumbotron --> */}
            </section>
            {/* <!-- Section: Design Block --> */}
        </div>
        </>
    );
};

export default Login
