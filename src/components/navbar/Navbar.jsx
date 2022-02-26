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
          <NavLink to='/listStations'>
            Liste stations
          </NavLink>
        </NavMenu>
        <Button className="h-75 mt-auto mb-auto" variant="light" onClick={props.switchTheme}>
          Mode {props.theme === 'dark' ? 'Clair' : 'Sombre'} 
        </Button>
      </Nav>
    </>
  );
};
  
export default Navbar;