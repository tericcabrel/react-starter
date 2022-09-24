import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Location } from 'history';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink as BSNavLink } from 'reactstrap';
import { FaTachometerAlt, FaTasks, FaUserAlt, FaCog, FaListUl, FaPlus, FaAngleRight } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

import './side-bar.scss';

const logo: any = require('../../../assets/icons/logo.svg');
const avatar: any = require('../../../assets/images/avatar.png');

const Sidebar: FC<{}> = (): ReactElement => {
  const { pathname }: Location = useLocation();

  const [toggleSubMenu, setToggleSubMenu]: [boolean, Function] = useState(false);
  const [activeMenu, setActiveMenu]: [string, Function] = useState('');

  useEffect((): void => {
    const mainRoutes: string[] = [
      '/dashboard', '/tasks', '/profile', '/settings'
    ];

    const index: number = mainRoutes.findIndex((route: string): boolean => pathname.includes(route)) + 1;

    setActiveMenu(index > 0 ? index.toString() : '1');
  },        [pathname]);

  const setActive: any = (key: string): void => {
    let toggle: boolean = false;

    if (activeMenu !== key) {
      toggle = true;
    } else {
      toggle = !toggleSubMenu;
    }

    setActiveMenu(key);
    setToggleSubMenu(toggle);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img alt="" src={logo} className="w-25"/> React starter
      </div>
      <div className="navigation-title"/>
      <div className="sidebar-user-info d-flex ">
        <img alt="" src={avatar} className="user-avatar"/>
        <div className="d-flex flex-column ml-3">
          <Link to="/app/profile">
            <span className="user-name font-weight-bold">Eric Cabrel</span>
          </Link>
          <span className="user-status text-success font-weight-bold">Admin</span>
        </div>
      </div>
      <div className="navigation-title">
        MENU NAVIGATION
      </div>
      <div className="menu-navigation">
        <Nav vertical={true} className="main-menu">
          <NavItem
            className={`main-menu-item ${ activeMenu === '1' ? 'active' : ''}`}
            onClick={(): void => setActive('1')}
          >
            <NavLink className="nav-link" to="/app/dashboard">
              <FaTachometerAlt /> <span className="nav-label">
              <FormattedMessage id="app.sidebar.menu.dashboard" defaultMessage="Dashboard" />
            </span>
            </NavLink>
          </NavItem>
          <NavItem
            className={`main-menu-item ${ activeMenu === '2' ? 'active' : ''}`}
            onClick={(): void => setActive('2')}
          >
            <BSNavLink to="#">
              <FaTasks />
              <span className="nav-label">
                <FormattedMessage id="app.sidebar.menu.tasks" defaultMessage="Tasks" />
              </span>
              <span className={`nav-caret nav-caret-${ activeMenu === '2' && toggleSubMenu ? 'down' : 'right' }`}>
                <FaAngleRight/>
              </span>
            </BSNavLink>
            <Nav vertical={true} className={`sub-menu ${ activeMenu === '2' && toggleSubMenu ? 'view' : 'hidden'}`}>
              <NavItem className="main-menu-item">
                <NavLink className="nav-link" to="/app/tasks">
                  <FaListUl/>
                  <span className="nav-label">
                    <FormattedMessage id="app.sidebar.menu.tasks.list" defaultMessage="List" />
                  </span>
                </NavLink>
                <NavLink className="nav-link" to="/app/tasks/new">
                  <FaPlus/>
                  <span className="nav-label">
                    <FormattedMessage id="app.sidebar.menu.tasks.add" defaultMessage="Add" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </NavItem>
          <NavItem
            className={`main-menu-item ${ activeMenu === '3' ? 'active' : ''}`}
            onClick={(): void => setActive('3')}
          >
            <NavLink className="nav-link" to="/app/profile">
              <FaUserAlt/>
              <span className="nav-label">
                <FormattedMessage id="app.sidebar.menu.profile" defaultMessage="Profile" />
              </span>
            </NavLink>
          </NavItem>
          <NavItem
            className={`main-menu-item ${ activeMenu === '4' ? 'active' : ''}`}
            onClick={(): void => setActive('4')}
          >
            <NavLink className="nav-link" to="/app/settings">
              <FaCog/>
              <span className="nav-label">
                <FormattedMessage id="app.sidebar.menu.settings" defaultMessage="Settings" />
              </span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
  </div>
  );
};

export default Sidebar;
