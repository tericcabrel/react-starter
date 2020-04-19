import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { LocaleMessages } from '../types/common';
import LocaleProvider from './LocaleProvider';

const loading: FC<{}> = (): React.ReactElement => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const Layout: any = Loadable({
  loading,
  loader: (): Promise<any> => import('./Layout'),
});

// Pages
const Login: any = Loadable({
  loading,
  loader: (): Promise<any> => import('./Auth/Login'),
});

const Register: any = Loadable({
  loading,
  loader: (): Promise<any> => import('./Auth/Register'),
});

const ConfirmAccount: any = Loadable({
  loading,
  loader: (): Promise<any> => import('./Auth/ConfirmAccount'),
});

const ForgotPassword: any = Loadable({
  loading,
  loader: (): Promise<any> => import('./Auth/ForgotPassword'),
});

const ResetPassword: any = Loadable({
  loading,
  loader: (): Promise<any> => import('./Auth/ResetPassword'),
});

const NotFound: any = Loadable({
  loading,
  loader: (): Promise<any> => import('./NotFound'),
});

interface IAppProps {
  messages: LocaleMessages;
}

const App: React.FC<IAppProps> = ({ messages }: IAppProps): React.ReactElement => {
  return (
      <LocaleProvider messages={messages}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" name="Login Page" component={Login} />
            <Route exact={true} path="/register" name="Register Page" component={Register} />
            <Route exact={true} path="/password/forgot" name="Forgot password Page" component={ForgotPassword} />
            <Route exact={true} path="/password/reset" name="Reset password Page" component={ResetPassword} />
            <Route exact={true} path="/account/confirm" name="Confirm account Page" component={ConfirmAccount} />
            <Route path="/app" name="Home" component={Layout} />
            <Route name="Page 404" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </LocaleProvider>
  );
};

export default App;
