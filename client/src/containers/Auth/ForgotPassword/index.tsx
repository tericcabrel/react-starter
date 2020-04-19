import React, { FC, MutableRefObject, ReactElement, useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { Col, Row, Spinner } from 'reactstrap';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { AuthState, ForgotPasswordData, RootState } from '../../../types/redux';

import { forgotPasswordAction, resetAuthStateAction } from '../../../store/auth/actions';

import withAuth from '../../../hofs/withAuth';

import FormForgotPassword from '../../../components/Forms/ForgotPassword';

import './forgot-password.scss';

type ForgotHandlerFn = (values: ForgotPasswordData) => Promise<void>;

const defaultData: ForgotPasswordData = { email: '' };

const ForgotPassword: FC<{}> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const intl: IntlShape = useIntl();

  const emailSuccess: MutableRefObject<boolean> = useRef(false);
  const authState: AuthState = useSelector((state: RootState): AuthState => state.auth);

  useEffect((): void => {
    const message: string = intl.formatMessage({
      id: 'app.auth.forgot.email.sent',
      defaultMessage: 'We have sent you an email with a link to reset your password!'
    });

    if (!emailSuccess.current && authState.success) {
      toast(message, { type: 'success', autoClose: 10000 });
      emailSuccess.current = true;
    }
  },        [authState.success, intl]);

  const forgotHandler: ForgotHandlerFn = async (values: ForgotPasswordData): Promise<void> => {
    if (emailSuccess.current) {
      emailSuccess.current = false;
    }

    // console.log('Form Forgot => ', values);
    await dispatch(forgotPasswordAction(values));
  };

  const resetAuthHandler: () => void = (): void => {
    dispatch(resetAuthStateAction());
  };

  return (
    <div className="app-auth app-forgot-password">
      <Row
        className="app-auth-container app-forgot-container justify-content-center align-items-center"
        noGutters={true}
      >
        <Col md="4">
          <div className="app-auth-content app-forgot-content flex-column">
            {authState.loading && <Spinner className="auth-spinner"/>}
            <h2>
              <FormattedMessage id="app.auth.forgot.title" defaultMessage="Forgot password"/>
            </h2>
            <p className="text-muted">
              <FormattedMessage
                id="app.auth.forgot.description"
                defaultMessage="Enter your email we will send you a mail with a reset link"
              />
            </p>

            <FormForgotPassword
              data={defaultData}
              loading={authState.loading}
              error={authState.error}
              onForgotPassword={forgotHandler}
              intl={intl}
            />
            <div className="app-forgot-extra d-flex justify-content-end">
              <Link to="/" className="login-link" onClick={resetAuthHandler}>
                <FormattedMessage
                  id="app.auth.register.has.account"
                  defaultMessage="Already have an account? Sign in!"
                />
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withAuth(ForgotPassword);
