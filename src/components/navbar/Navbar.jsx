import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu
} from './NavbarElements';
  
const Navbar = (props) => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/map'>
            Map
          </NavLink>
          <NavLink to='/stateMap'>
            Statistiques
          </NavLink>
        </NavMenu>
        <button onClick={props.switchTheme}>
          Switch to {props.theme === 'dark' ? 'light' : 'dark'} theme 
        </button>
      </Nav>
    </>
  );
};
  
export default Navbar;