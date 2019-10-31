import React from 'react';

import Scan from './Components/Scan'
import Infovotante from './Components/Infovotante'

import './App.css';
import logo from './images/LOGOS-04.png'
import { Provider } from "react-redux"
import Store from "./Components/Redux/store"


function App() {
  return (
    <Provider store={Store}>

      <div className="App">
        <img src={logo} className="home-logo" alt="Logo" />


        <Infovotante></Infovotante>


      </div>
    </Provider>
  );
}

export default App;
