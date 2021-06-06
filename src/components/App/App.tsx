import React from 'react';
import Search from '../Search/Search';
import './App.css';
import logo from '../../assets/logo.png';


function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img className="logo" src={logo}/>
        <Search />
      </header>
    </div>
  );
}

export default App;
