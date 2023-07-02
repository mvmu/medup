import React from "react";
import "./SearchPage.css";
import { useState, useEffect } from "react";
import DoctorsList from "../../components/doctors/DoctorsList";
import SearchIcon from '../../assets/usability/search.svg'


const SearchPage = () => {
  // the constants to get and set throught useState
  const [doctors, setDoctors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [textInserted, setTextInserted] = useState("");
  const [categoryInserted, setCategoryInserted] = useState(null);


  const getDoctors = async () => {
    try {
      const response = await fetch("http://localhost:4000/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
        const response = await fetch("http://localhost:4000/categories");
        const data = await response.json();
        setCategories(data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    // get the list of doctors when the page loads
    getDoctors();
    // get the list of categories when the page loads
    getCategories();
  }, []);

  // a constant to contain the filter of doctors  
  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.name} ${doctor.surname}`.toLowerCase();
    return (
      fullName.includes(textInserted.toLowerCase()) &&
      (categoryInserted === null || doctor.category_id === categoryInserted)
    );
  });


    function onButtonClick(e) {
        let selectedCategory = parseInt(e.target.value); // to compare between integers
        setCategoryInserted(selectedCategory);
    }

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row pt-5">
            <h2>Find doctors by name or surname</h2>
        </div>
        <div className="row p-3">
          <div className="form-group has-search">
            <div className="input-group-text border-0" id="searchBar">
              <span>
               <img className="m-3" src={SearchIcon} alt="search icon" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Type something"
                value={textInserted}
                onChange={(e) => setTextInserted(e.target.value)}
              /> 
            </div>    
          </div>
        </div>
        <div className="row pt-3">
            <h2>Search by category</h2>
        </div>
            <div className="container p-3">
                
                {categories.map(category => <button 
                                            key={category.id}
                                            value={category.id} 
                                            //compare the button value with the actual selected one (needed to do a toString since the category.id variable is an integer)
                                            // and applies the btn-primary class if they match. Otherwise it applies the btn-secondary
                                            className={category.id === categoryInserted ? "btn btn-primary m-1" : "btn btn-light m-1"}
                                            onClick={onButtonClick}>
                                                {category.value}
                                            </button>)}
                <br />
                <button className="btn btn-danger mt-3 p-2" onClick={e => {setCategoryInserted(null);setTextInserted("")}}>
                    Reset all filters
                </button>
            </div>
        </div>
        <div className="row pt-5">
          <DoctorsList doctors={filteredDoctors} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
