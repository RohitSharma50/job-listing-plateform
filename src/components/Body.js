import React, { useState, useEffect } from "react";
import InfiniteScroll from "./InfiniteScroll";
import SortOptions from "./SortOptions";

function Body() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        "limit": 10,
        "offset": (page - 1) * 10
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(prevData => [...prevData, ...result.jdList]);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const sortBy = (criteria) => {
    // Sort data based on the selected criteria
    const sortedData = [...data].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setData(sortedData);
  };

  return (
    <>
      <SortOptions sortBy={sortBy} />
      <div className="container">
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="card">
            <div className="image"><img src={item.logoUrl}/> 
            <h4 className="company" >{item.companyName}</h4></div>
             
            <h4 className="jobTitle">Job Title: {item.jobRole}</h4>
            <h5 className="location" >{item.location.toUpperCase()}</h5>
            <h5 className="experience">Experience: {(item?.minExp===null)?"0":item?.minExp}-{(item?.maxExp===null)?"0":item?.maxExp}Years</h5>
            <h5 className="salary">Salary: {(item?.minJdSalary===null)?"0":item?.minJdSalary}-{item?.maxJdSalary} {item?.salaryCurrencyCode}</h5>
<p><b>Job Discription: </b></p>
            <p className="Discription">  {item.jobDetailsFromCompany}</p>
            <p className="applyLink"><a href={item.jdLink}><button type="button">Apply</button></a></p>
           
            </div>
          ))}
          <InfiniteScroll loadMore={loadMore} />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default Body;
