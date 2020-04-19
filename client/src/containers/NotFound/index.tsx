import React, { FC, ReactElement } from 'react';

import './not-found.scss';

const NotFound: FC<{}> = (): ReactElement => {
  return (
    <div className="app-not-found">
      <h1>NOT FOUND</h1>
    </div>
  );
};

export default NotFound;
