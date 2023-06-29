import { NavLink as Link } from 'react-router-dom';
import './NavBar.css'
import logo from '../../assets/brand/logo.svg'


function NavBar() {


  async function logout() {
    try {
        console.log("doing logout!");
        const response = await fetch("http://localhost:4000/logout", {
            method : "GET",
            credentials: 'include'
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand p-2" href="/">
          Medup
          <img src={logo} alt="Medup"/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* Link instead of simple <a href > element because of React framework */}
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/appointment">Get appointment</Link>
            </li>
            {/* MOVE TO THE RIGHT SIDE OF THE NAVBAR */}
            <li className="nav-item">
              <button className="btn btn-danger" onClick={logout}>
                Log out
              </button>
            </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default NavBar