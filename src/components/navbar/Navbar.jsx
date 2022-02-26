import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu
} from './NavbarElements';
import Button from "react-bootstrap/Button";
  
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
        <Button className="h-75 mt-auto mb-auto" variant="warning" onClick={props.switchTheme}>
          Switch to {props.theme === 'dark' ? 'light' : 'dark'} theme 
        </Button>
      </Nav>
    </>
  );
};
  
export default Navbar;