//import React
import React from 'react'
//impoer React DOM
import ReactDOM from 'react-dom/client';
//import bootstrap framework
import 'bootstrap/dist/css/bootstrap.min.css';
//import the stylesheet of index
import './index.css'
//import pages:
import Home from './pages/Home/Home/';
import SearchPage from './pages/Search/SearchPage';
import AppointmentPage from './pages/Appointment/AppointmentPage';
//import router 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//import navbar
import NavBar from './components/navbar/NavBar';

//TODO this will change when we'll implement the sessions
const mockUserId = 1;

//create router constant, to make friendly urls
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home loggedUserId={mockUserId} />
  },
  {
    path: "/search",
    element: <SearchPage loggedUserId={mockUserId} />
  },
  {
    path: "/appointment",
    element: <AppointmentPage loggedUserId={mockUserId} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <NavBar />
    <RouterProvider router={router} />
  </>
);
