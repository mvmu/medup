import { NavLink as Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserSessionContext from '../../context/UserSessionContext';
import './NavBar.css';
import logo from '../../assets/brand/logo.svg';
import logoName from '../../assets/brand/MEDUP.svg';

function NavBar() {
  // constant to get the session context
  const sessionUser = useContext(UserSessionContext);
  // constant to apply the boolean isDoctor, through user session
  const isDoctor = sessionUser.isDoctor;
  // constant to detect if the menu is open in mobile and display its content
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // function to log out the user session, then change the location of the window to show the login page
  async function logout() {
    try {
      console.log('doing logout!');
      fetch('http://localhost:4000/logout', {
        method: 'GET',
        credentials: 'include'
      }).then(() => {
        window.location.reload(true);
        return false;
      });
    } catch (error) {
      console.error(error);
    }
  }
  // constant to set the state of the menu 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* all pages will have a padding-top to display correctly, given the fixed-top position of the navbar */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-lg fixed-top px-3" id="navBar">
        <div className="container-fluid">
          <Link className="navbar-brand pr-2 d-flex justify-content-between" to="/">
            <img src={logoName} alt="Medup" />
            <img src={logo} alt="Medup" />
          </Link>
          <button
            className={`navbar-toggler ${isMenuOpen ? 'collapsed' : ''}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* responsive navbar with collapsing and a conditional */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-between align-items-center" id="navbarList">
              <div className="d-flex align-items-center" id="navbarContent">
                <li className="nav-item onMobile">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className={!isDoctor ? "nav-item onMobile" : "d-none"}>
                  <Link className="nav-link" aria-current="page" to="/search">
                    Search
                  </Link>
                </li>
                <li className={isDoctor ? "nav-item onMobile" : "d-none"}>
                  <Link className="nav-link" aria-current="page" to="/manage">
                    Manage appointments
                  </Link>
                </li>
                <li className={!isDoctor ? "nav-item" : "d-none"}>
                  <Link className="nav-link" aria-current="page" to="/appointment">
                    Get appointment
                  </Link>
                </li>
              </div>
              <div>
                <li className="nav-item">
                  <button 
                      className="btn btn-danger btn-sm" 
                      onClick={logout} 
                      id="logoutButton">
                    Log out
                  </button>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
