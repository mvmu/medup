import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Home from './pages/home/Home';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "doctors",
    //     element: <Doctors />,
    //     loader: teamLoader,
    //   },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
