import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav } from 'reactstrap';

import LocaleSelector from '../components/LocaleSelector';
import ErrorHandler from '../components/ErrorHandler';

// styles
import './hofs.scss';

import logo from '../assets/icons/logo.svg';

type WithAuthType = (component: FC<any>) => () => ReactElement;

const getWindowHeight: () => number = (): number => {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
};

// @ts-ignore
const withAuth: WithAuthType = (Wrapped: FC<any>): () => ReactElement => {
  return (): ReactElement => {
    // tslint:disable-next-line:react-hooks-nesting
    const [height, setHeight]: [number, Function] = useState(getWindowHeight());
    // tslint:disable-next-line:react-hooks-nesting
    const [isOpen, setIsOpen]: [boolean, Function] = useState(false);

    // tslint:disable-next-line:react-hooks-nesting
    useEffect((): any => {
      const rootId: HTMLElement|null = document.getElementById('root');

      if (rootId !== null) {
        rootId.style.height = `${height}px`;
      }

      window.addEventListener('resize', (): void => {
        window.requestAnimationFrame((): void => {
          setHeight(getWindowHeight());
        });
      });

      return (): void => {
        setHeight(getWindowHeight());
        window.removeEventListener('resize', (): void => { });
      };
    });

    const toggle: any = (): void => {
      setIsOpen((v: boolean): boolean => !v);
    };

    return (
      <div className="auth-main">
        <Container fluid={true} className="auth-container" style={{ height: height - 45 }}>
          <Navbar color="light" light={true} expand="md">
            <NavbarBrand href="/">
              <img alt="" src={logo} className="w-25"/> React starter
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar={true}>
              <Nav className="ml-auto" navbar={true}>
                <LocaleSelector />
              </Nav>
            </Collapse>
          </Navbar>

          <div className="auth-content">
            <ErrorHandler>
              <Wrapped />
            </ErrorHandler>
          </div>
        </Container>
      </div>
    );
  };
};

export default withAuth;
