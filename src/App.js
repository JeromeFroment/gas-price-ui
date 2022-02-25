import React from "react";
import './App.css';
import RouterFunction from "./components/routing/Router";
import {FilterProvider} from "./contexts/FilterContext";

function App() {
  return (
      <FilterProvider>
        <RouterFunction></RouterFunction>
      </FilterProvider>
  );
}

export default App;
