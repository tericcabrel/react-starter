import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Col, Row, Spinner } from 'reactstrap';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { History } from 'history';

import withAuth from '../../../hofs/withAuth';

import { LoginData, RootState } from '../../../types/redux';
import { User } from '../../../types/model';

import LocalStorageManager from '../../../utils/local-storage-manager';
import { loginUserAction } from '../../../store/auth/actions';
import { getUserAction } from '../../../store/app/actions';

import AppFeature from '../../../components/AppFeature';
import FormLogin from '../../../components/Forms/Login';

import './login.scss';

const defaultState: LoginData =  {
  email: '',
  password: ''
};

type LoginHandlerFn = (values: LoginData) => Promise<void>;

const Login: React.FC<{}> = (): React.ReactElement => {
  const history: History = useHistory();
  const intl: IntlShape = useIntl();
  const dispatch: Dispatch = useDispatch();

  const user: User|null = useSelector((state: RootState): any => state.app.user);
  const loading: boolean = useSelector((state: RootState): boolean => state.auth.loading);
  const error: Object|null  = useSelector((state: RootState): Object|null => state.auth.error);

  useEffect((): void => {
    const currentUserToken: string|null = LocalStorageManager.getUserAccessToken();

    if (user && currentUserToken) {
      history.push('/app/dashboard');
    }
  },        [user, history]);

  const loginHandler: LoginHandlerFn = async (values: LoginData): Promise<void> => {
    // console.log('Form Login => ', values);
    await dispatch(loginUserAction(values));

    const token: string|null = LocalStorageManager.getUserAccessToken();
    if (token) {
      await dispatch(getUserAction());
      history.push('/app/dashboard');
    }
  };

  return (
    <div className="app-auth app-login">
      <Row
        className="app-auth-container app-login-container justify-content-center align-items-center"
        noGutters={true}
      >
        <Col md="6">
          <div className="app-auth-content app-login-content flex-row">
            <div className="first-side d-flex flex-column justify-content-around">
              <div className="first-side-section-one d-flex flex-column align-items-center">
                <h2>React starter</h2>
                <p>
                  <FormattedMessage
                    id="app.with.typescript"
                    defaultMessage="with Typescript"
                  />
                </p>
              </div>
              <div className="first-side-section-two">
                <AppFeature/>
              </div>
            </div>
            <div className="second-side">
              {loading && <Spinner className="auth-spinner"/>}
              <h2>
                <FormattedMessage
                  id="app.auth.login"
                  defaultMessage="Login"
                />
              </h2>
              <p className="text-muted">
                <FormattedMessage
                  id="app.auth.login.message"
                  defaultMessage="Sign in to your account"
                />
              </p>

              <FormLogin
                data={defaultState}
                error={error}
                loading={loading}
                onLogin={loginHandler}
                intl={intl}
              />
            </div>
          </div>
          <div className="app-login-extra">
            <Link to="/register" className="register-link">
              <FormattedMessage
                id="app.auth.login.no.account"
                defaultMessage="Don't have account yet? Register Now!"
              />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withAuth(Login);
