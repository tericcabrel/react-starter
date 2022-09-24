import React, { FC, memo, ReactElement, useEffect } from 'react';
import { Location } from 'history';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Alert, Col, Row, Spinner } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { parse, ParsedQuery } from 'query-string';

import { AuthState, RootState } from '../../../types/redux';
import { resetAuthStateAction, confirmAccountAction } from '../../../store/auth/actions';

import withAuth from '../../../hofs/withAuth';

import AuthError from '../../../components/AuthError';

import './confirm-account.scss';

const AlertActivating: FC<{}> = memo((): ReactElement => (
  <Alert color="info" className="auth-info" isOpen={true}>
    <FormattedMessage id="app.auth.account.confirm.activating" defaultMessage="Activating..."/>
  </Alert>
));

const AlertActivated: FC<{}> = memo((): ReactElement => (
  <Alert color="success" className="auth-success" isOpen={true}>
    <FormattedMessage
      id="app.auth.account.confirm.confirmed"
      defaultMessage="Your account confirmed successfully!!!."
    />
  </Alert>
));

const ConfirmAccount: FC<{}> = (): ReactElement => {
  const { search }: Location = useLocation();
  const dispatch: Dispatch = useDispatch();
  const authState: AuthState = useSelector((state: RootState): AuthState => state.auth);

  useEffect((): void => {
    const query: ParsedQuery = parse(search.substring(1));
    // console.log(query);

    dispatch(confirmAccountAction({ token: query.token as string }));
  },        [search, dispatch]);

  const resetAuthHandler: () => void = (): void => {
    dispatch(resetAuthStateAction());
  };

  return (
    <div className="app-auth app-confirm-account flex-row align-items-center">
      <Row
        className="app-auth-container app-confirm-account-container justify-content-center align-items-center"
        noGutters={true}
      >
        <Col md="4">
          <div className="app-auth-content app-confirm-account-content flex-column">
            {authState.loading && <Spinner className="auth-spinner"/>}
            <h2>
              <FormattedMessage id="app.auth.account.confirm.title" defaultMessage="Account confirmation"/>
            </h2>

            <div className="mt-4 mb-4">
              <AuthError error={authState.error}/>
              {!authState.accountConfirmed && !authState.error && <AlertActivating />}
              {authState.accountConfirmed && <AlertActivated />}
            </div>
            <div className="app-confirm-account-extra d-flex justify-content-end">
              <Link to="/" className="login-link" onClick={resetAuthHandler}>
                <FormattedMessage id="app.auth.account.confirm.back" defaultMessage="Back to the login"/>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withAuth(ConfirmAccount);
