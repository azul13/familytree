import React, { Component, useState } from 'react';
import './Header.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from "react-router-dom";
import { useAppContext } from "../libs/contextLib";

export default () => {
  const [collapsed, setCollapsed] = useState(true);
  const {isAuthenticated, userHasAuthenticated} = useAppContext();

  const toggleNavbar = () => setCollapsed(!collapsed);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto" style={{ color: '#495057', fontSize: '30px' }}>
          Family Tree
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
          {isAuthenticated
          ? <NavItem>
              <NavLink style={{ textAlign: 'center' }}>
                <Link to="/homePage" onClick={handleLogout}>Logout</Link>
              </NavLink>
            </NavItem>
          : <>
            <NavItem>
                <NavLink style={{ textAlign: 'center' }}>
                  <Link to="/homePage" onClick={toggleNavbar}>Home</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{ textAlign: 'center' }}>
                  <Link to="/editPage" onClick={toggleNavbar}>Edit Relatives</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" style={{ textAlign: 'center' }}>
                  Options
                </NavLink>
              </NavItem>
              </>
          }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

//export default class Header extends Component

//export default class Header extends React.Component
