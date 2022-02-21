import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/map'>
            Map
          </NavLink>
          <NavLink to='/stateMap'>
            Statistics
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;