import React, { FC } from 'react';

interface LoaderType {
  customClass?: string;
}

const loader: FC<LoaderType> = ({ customClass }: LoaderType): React.ReactElement => {
  const classes: string = customClass ? customClass : '';

  return (
    <div className={`animated fadeIn pt-1 text-center ${classes}`}>Loading...</div>
  );
};

export default loader;
