import React from "react";
import './App.css';
import RouterFunction from "./components/routing/Router";
import {FilterProvider} from "./contexts/FilterContext";
import useLocalStorage from 'use-local-storage';
import {LoginAccess} from "./page/loginAccess/LoginAccess";
import useToken from './components/token/useToken';
import {useEffect} from "react";


function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchTheme = ()=>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  const { token, setToken } = useToken();
  const [ tokenRefresh, setTokenRefresh ] = useLocalStorage('token');

  if(!token && !tokenRefresh) {
    return <LoginAccess setToken={setToken} />
  }
  
  return (
    <>
      <div className="App" data-theme={theme}>
          <FilterProvider>
            <RouterFunction theme={theme} switchTheme={switchTheme}></RouterFunction>
          </FilterProvider>
      </div>
    </>
  );
}

export default App;
