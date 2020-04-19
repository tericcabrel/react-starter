import React, { FC, MutableRefObject, ReactElement, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Spinner } from 'reactstrap';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import withAuth from '../../../hofs/withAuth';

import { RegisterData, AuthState, RootState } from '../../../types/redux';
import { registerUserAction } from '../../../store/auth/actions';

import AppFeature from '../../../components/AppFeature';
import FormRegister from '../../../components/Forms/Register';

import './register.scss';

const defaultState: RegisterData = {
  email: '',
  password: '',
  username: '',
  name: '',
  confirmPassword: ''
};

interface IRegisterProps {

}

type RegisterHandlerFn = (values: RegisterData) => Promise<void>;

const Register: FC<IRegisterProps> = (): ReactElement => {
  const registerSuccess: MutableRefObject<boolean> = useRef(false);
  const dispatch: Dispatch = useDispatch();
  const intl: IntlShape = useIntl();

  const authState: AuthState = useSelector((state: RootState): AuthState => state.auth);

  useEffect((): void => {
    const message: string = intl.formatMessage({
      id: 'app.auth.register.success',
      defaultMessage: 'Account created successfully! Check your email to confirm your account!'
    });

    if (!registerSuccess.current && authState.success) {
      toast(message, { type: 'success' });
      registerSuccess.current = true;
    }
  },        [authState.success, intl]);

  const registerHandler: RegisterHandlerFn = async (values: RegisterData): Promise<void> => {
    registerSuccess.current = false;
    // console.log('Form Register => ', values);
    await dispatch(registerUserAction(values));
  };

  return (
    <div className="app-auth app-register">
      <Row
        className="app-auth-container app-register-container justify-content-center align-items-center"
        noGutters={true}
      >
        <Col md="6">
          <div className="app-auth-content app-register-content flex-row">
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
              {authState.loading && <Spinner className="auth-spinner"/>}
              <h2>
                <FormattedMessage
                  id="app.auth.registration"
                  defaultMessage="Registration"
                />
              </h2>
              <p className="text-muted">
                <FormattedMessage
                  id="app.auth.register.message"
                  defaultMessage="Sign up to your account"
                />
              </p>

              <FormRegister
                data={defaultState}
                error={authState.error}
                loading={authState.loading}
                onRegister={registerHandler}
                intl={intl}
              />
            </div>
          </div>
          <div className="app-register-extra">
            <Link to="/" className="register-link">
              <FormattedMessage
                id="app.auth.register.has.account"
                defaultMessage="Already have an account? Sign in!"
              />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withAuth(Register);
