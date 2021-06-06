import React from 'react';
import Search from '../Search/Search';
import './App.css';
import logo from '../../assets/logo.png';
import { getSearchResults } from '../../apiCalls';
import { useState } from 'react';




function App() {

  const [searchResults, setSearchResults] = useState('');


  const handleNewSearch = (search) => {
    getSearchResults(search)
    .then(response => response.data.items)
    .then(data => setSearchResults(data))
  }

  return (
    <div className="app">
      <header className="app-header">
        <img className="logo" src={logo}/>
        <Search
          handleNewSearch={handleNewSearch}
        />
      </header>
    </div>
  );
}

export default App;
