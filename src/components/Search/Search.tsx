import React from 'react';
import './Search.css';


function Search() {
  return (
    <div className="search-container">
      <input className="input" type="search" placeholder="Search Repositories By Keyword"/>
        <section className="filter-container">
          <label className="label">Filter By :</label>
          <select className="drop" type="dropdown">
            <option value="0">Select Language</option>
          </select>
          <label className="label">Sort By :</label>
          <select className="drop" type="dropdown">
            <option value="0">Best Match</option>
            <option value="1">Number of Stars</option>
          </select>
        </section>
    </div>
  );
}

export default Search;
