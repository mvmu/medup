import React from "react";
// import assets
import notFoundPic from '../../assets/usability/404.svg'
import './NotFound.css'

const NotFound = () => {
    return (
        <>
        {/* all pages have a padding-top to display correctly, given the fixed-top position of the navbar */}
        <div className="container pt-5 mt-5 mx-2" id="notFoundPage">
            <div className="row pt-5 justify-content-center shadow" id="row404">
                <h1 className="pt-2">404</h1>
                <p className="pb-2">Page Not Found</p>               
                <h1 className="pt-3 pb-4 px-3">Sorry, we couldn't find what you were looking for</h1>
                <img src={notFoundPic} alt="not found" className="w-25"/>
            </div>
        </div>
        </>
    );
};

export default NotFound