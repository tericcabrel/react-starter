import React, { FC, ReactElement, Suspense } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps, Switch } from 'react-router-dom';

import { RouteConfig } from '../../types/common';
import { User } from '../../types/model';

import routes from '../../routes';

import Sidebar from './SideBar';
import Loader from '../../components/Loader';

import LocalStorageManager from '../../utils/local-storage-manager';

import './layout.scss';

const AppHeader: any = React.lazy((): Promise<any> => import('./Header'));
// const AppFooter: any = React.lazy((): Promise<any> => import('./Footer'));

export const PrivateRoute: (props: RouteProps) => any = ({ component, ...rest }: RouteProps): any => {
  if (!component) {
    throw Error('Error: Component is undefined');
  }

  // JSX Elements have to be uppercase.
  const Component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> = component;

  const render: (props: RouteComponentProps<any>) => React.ReactNode = (
    props: RouteComponentProps<any>
  ): React.ReactNode => {
    const currentUserToken: string|null = LocalStorageManager.getUserAccessToken();
    const userInfo: User|null = LocalStorageManager.getUserInfo();

    if (userInfo && currentUserToken) {
      return <Component {...props} />;
    }

    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
  };

  return (<Route {...rest} render={render} />);
};

const Layout: FC<{}> = (): ReactElement => {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-layout-body">
        <div className="app-layout-header">
          <Suspense  fallback={<Loader />}>
            <AppHeader />
          </Suspense>
        </div>

        <div className="main mb-3">
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map((route: RouteConfig, idx: number): ReactElement|null => {
                return route.component ? (
                  <PrivateRoute
                    key={`route_${idx}`}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                ) : (null);
              })}
              <Redirect from="/" to="/app/dashboard" />
            </Switch>
          </Suspense>
        </div>

        {/* <div className="app-layout-footer">
          <Suspense  fallback={ <Loader /> }>
            <AppFooter />
          </Suspense>
        </div>*/}
      </div>
    </div>
  );
};

export default Layout;
