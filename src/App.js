import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import HomeComponent from '../src/pages/home/HomeComponent';
import SingleComponent from '../src/pages/single/SingleComponent';
import {BreedContext} from './context/BreedContext';

function App() {
  const [breeds,setBreeds] = useState([]);
  const breedsSetter = (values) =>{
    setBreeds(values);
  }
  useEffect(()=>{
    fetchBreed();
  },[]);
  const fetchBreed = () => {
    axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
      breedsSetter(response.data);
    });
  };
  return (
    <BreedContext.Provider value={{breeds}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent/>} />
          <Route path="/kitty/:id" element={<SingleComponent/>} />
        </Routes>
      </BrowserRouter>
    </BreedContext.Provider>
  );
}

export default App;
