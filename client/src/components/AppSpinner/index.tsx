import React, { FC, ReactElement } from 'react';
import { Spinner } from 'reactstrap';

import './app-spinner.scss';

const AppSpinner: FC<{}> = (): ReactElement => (
  <div className="app-spinner">
    <Spinner />
  </div>
);

export default AppSpinner;
