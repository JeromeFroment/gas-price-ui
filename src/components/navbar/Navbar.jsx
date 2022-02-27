import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu
} from './NavbarElements';
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';

  
const Navbar = (props) => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/map'>
            Carte
          </NavLink>
          <NavLink to='/stateMap'>
            Statistiques
          </NavLink>
          <NavLink to='/listStations'>
            Liste stations
          </NavLink>
          <Button className="h-75 m-2" variant="light" onClick={props.switchTheme}>
            Mode {props.theme === 'dark' ? 'Clair' : 'Sombre'} 
          </Button>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;