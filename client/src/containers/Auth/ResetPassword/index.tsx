import React, { FC, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Location } from 'history';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row, Spinner } from 'reactstrap';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { parse, ParsedUrlQuery } from 'querystring';
import { toast } from 'react-toastify';

import { AuthState, ResetPasswordData, RootState } from '../../../types/redux';
import { resetAuthStateAction, resetPasswordAction } from '../../../store/auth/actions';

import withAuth from '../../../hofs/withAuth';

import FormResetPassword from '../../../components/Forms/ResetPassword';

import './reset-password.scss';

type ResetHandlerFn = (values: ResetPasswordData) => void;

const defaultData: ResetPasswordData = {
  password: '',
  confirmPassword: '',
};

const ResetPassword: FC<{}> = (): ReactElement => {
  const { search }: Location = useLocation();
  const dispatch: Dispatch = useDispatch();
  const intl: IntlShape = useIntl();

  const resetSuccess: MutableRefObject<boolean> = useRef(false);
  const authState: AuthState = useSelector((state: RootState): AuthState => state.auth);
  const [resetToken, setResetToken]: [string|null, Function] = useState(null);

  useEffect((): void => {
    const query: ParsedUrlQuery = parse(search.substring(1));

    setResetToken(query.token as string);
  },        [search]);

  useEffect((): void => {
    const message: string = intl.formatMessage({
      id: 'app.auth.reset.success',
      defaultMessage: 'Your password have been changed successfully! You can now sign in'
    });

    if (!resetSuccess.current && authState.success) {
      toast(message, { type: 'success', autoClose: 10000 });

      resetSuccess.current = true;
    }
  },        [authState.success, intl]);

  const resetHandler: ResetHandlerFn = (values: ResetPasswordData): void => {
    resetSuccess.current = false;

    dispatch(resetPasswordAction({ reset_token: resetToken, password: values.password }));
  };

  const resetAuthHandler: () => void = (): void => {
    dispatch(resetAuthStateAction());
  };

  return (
    <div className="app-auth app-reset-password">
      <Row
        className="app-auth-container app-reset-container justify-content-center align-items-center"
        noGutters={true}
      >
        <Col md="4">
          <div className="app-auth-content app-reset-content flex-column">
            {authState.loading && <Spinner className="auth-spinner"/>}
            <h2>
              <FormattedMessage id="app.auth.reset.title" defaultMessage="Reset password"/>
            </h2>

            <p className="text-muted">
              <FormattedMessage
                id="app.auth.reset.description"
                defaultMessage="Enter a new password to reset your account"
              />
            </p>

            <FormResetPassword
              data={defaultData}
              loading={authState.loading}
              error={authState.error}
              onResetPassword={resetHandler}
              intl={intl}
            />
            <div className="app-reset-extra d-flex justify-content-end">
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

export default withAuth(ResetPassword);
