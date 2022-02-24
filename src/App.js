import React from "react";
import './App.css';
import RouterFunction from "./components/routing/Router";
import useLocalStorage from 'use-local-storage'

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  
  const switchTheme = ()=>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }
  
  return (
    <>
      <div className="App" data-theme={theme}>
        <RouterFunction theme={theme} switchTheme={switchTheme}></RouterFunction>
      </div>
    </>
  );
}

export default App;
