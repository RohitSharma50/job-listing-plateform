import React from "react";

function SortOptions({ sortBy }) {
  const handleSort = (event) => {
    sortBy(event?.target?.value);
  };

  return ( 
    <div className="sortby">
    <div >
      <label htmlFor="sortBy">Apply Filter :</label>
      <select id="sortBy" onChange={handleSort}>
        <option value="" ><label >Sort by :</label></option>
        <option value="companyName">Company Name</option>
         <option value="location">Location</option>  
        <option value="minJdSalary">Minimum Salary</option>
        {/* Add more options for sorting criteria */}
      </select>
    </div>
    <div>
    <label htmlFor="sortBy">Apply Filter :</label>
    <select id="sortBy" onChange={handleSort}>
    <option value="" ><label >Sort by:</label></option>
        <option value="minExp">Minimun Exp.</option>
        <option value="jobRole">JobRole</option>
        
      </select>
    </div>
    
    </div>
  );
}

export default SortOptions;