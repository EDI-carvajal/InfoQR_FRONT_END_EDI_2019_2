import React from 'react';

import Scan from './Components/Scan'
import Infovotante from './Components/Infovotante'

import './App.css';
import logo from './images/LOGOS-04.png'


function App() {
  return (
    <div className="App">
      <img src={logo} className="home-logo" alt="Logo" />


      <Infovotante></Infovotante>


    </div>
  );
}

export default App;
