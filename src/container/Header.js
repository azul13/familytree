import React, { Component, useState } from 'react';
import './Header.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from "react-router-dom";

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto" style={{ color: '#495057', fontSize: '30px' }}>
          Family Tree
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
          <NavItem>
              <NavLink style={{ textAlign: 'center' }}>
                <Link to="/homePage">Home</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ textAlign: 'center' }}>
                <Link to="/editPage">Edit Relatives</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" style={{ textAlign: 'center' }}>
                Options
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

//export default class Header extends Component

//export default class Header extends React.Component
