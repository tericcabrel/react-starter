import React, { FC, ReactElement, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { History } from 'history';
import {
  Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown
} from 'reactstrap';
import { FaSignOutAlt, FaUserAlt, FaCog } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

import { logoutUserAction } from '../../../store/app/actions';

import LocaleSelector from '../../../components/LocaleSelector';

import './header.scss';

const avatar: any = require('../../../assets/images/avatar.png');

const Header: FC<{}> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const history: History = useHistory();

  const [isOpen, setIsOpen]: [boolean, Function] = useState(false);

  const toggle: () => void = (): void => {
    setIsOpen((v: boolean): boolean => !v);
  };

  const signOut: any = (): void => {
    dispatch(logoutUserAction());
    history.push('/');
  };

  return (
    <Navbar color="light" light={true} fixed="top" expand="md" className="app-header">
      <NavbarBrand href="/"/>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar={true}>
        <Nav navbar={true}>
          <LocaleSelector />
        </Nav>
        <Nav className="ml-auto user-profile" navbar={true}>
          <UncontrolledDropdown nav={true} inNavbar={true}>
            <DropdownToggle nav={true} caret={true}>
              <img alt="" src={avatar} className="user-avatar"/>
              <span className="user-name">Eric Cabrel</span>
            </DropdownToggle>
            <DropdownMenu right={true}>
              <DropdownItem onClick={(): void => { history.push('/app/profile'); }}>
                <FaUserAlt className="user-header-icon"/>
                <span>
                  <FormattedMessage id="app.header.user.menu.profile" defaultMessage="Profile" />
                </span>
              </DropdownItem>
              <DropdownItem divider={true} />
              <DropdownItem onClick={(): void => {}}>
                <FaCog className="user-header-icon"/>
                <span>
                  <FormattedMessage id="app.header.user.menu.settings" defaultMessage="Settings" />
                </span>
              </DropdownItem>
              <DropdownItem divider={true} />
              <DropdownItem onClick={signOut}>
                <FaSignOutAlt className="user-header-icon" />
                <span>
                  <FormattedMessage id="app.header.user.menu.signout" defaultMessage="Sign out" />
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
