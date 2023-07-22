// import navlink to navigate through links
import { NavLink as Link } from 'react-router-dom';
// use the context to determine the environment, doctor or patient
import { useContext, useState } from 'react';
import UserSessionContext from '../../context/UserSessionContext';
import './Footer.css';

function Footer() {
    // constant to get the session context
    const sessionUser = useContext(UserSessionContext);
    // constant to apply the boolean isDoctor, through user session
    const isDoctor = sessionUser.isDoctor;
    return (
      <>
        <footer className="d-flex flex-column text-white pt-3 mt-5" id="footer">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <div className="d-flex flex-column justify-content-around" id="navbarContent">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className={!isDoctor ? "nav-item" : "d-none"}>
                  <Link className="nav-link" aria-current="page" to="/search">
                    Search
                  </Link>
                </li>
                <li className={!isDoctor ? "nav-item" : "d-none"}>
                  <Link className="nav-link" aria-current="page" to="/appointment">
                    Get appointment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/history">
                    Appointment history
                  </Link>
                </li>
              </div>
            </ul>
            <hr className="hr hr-blurry" />
            <div className="justify-content-center p-3">
                Medup© 2023 Company, Inc. All rights reserved.
            </div>            
        </footer>    
      </>
    );
  }

export default Footer;
