import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  background: var(--background-secondary);
  width: 100%;
`;
  
export const NavLink = styled(Link)`
  color: var(--text-primary);
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: var(--text-secondary);
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;
  
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
`;