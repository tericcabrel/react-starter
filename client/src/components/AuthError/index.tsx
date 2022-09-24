import React, { FC, Fragment, ReactElement, useState } from 'react';
import { Alert } from 'reactstrap';

import './auth-error.scss';

export interface IAuthErrorProps {
  error: any;
}

const AuthError: FC<IAuthErrorProps> = ({ error }: IAuthErrorProps): ReactElement => {
  const [showVisible, setShowVisible]: [boolean, Function] = useState(true);

  const onDismiss: (isVisible: boolean) => void = (isVisible: boolean): void => {
    setShowVisible(!isVisible);
  };

  return (
    <Fragment>
      { error &&
      // tslint:disable-next-line:jsx-wrap-multiline
        <Alert color="danger" className="auth-error" isOpen={showVisible} toggle={(): void => onDismiss(showVisible)}>
          {error}
        </Alert>
      }
    </Fragment>
  );
};

export default AuthError;
