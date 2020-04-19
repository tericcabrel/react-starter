import React, { FC, ReactElement } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AppFeature: FC<{}> = (): ReactElement => (
  <ul>
    <li><FaCheckCircle /> Typescript support</li>
    <li><FaCheckCircle /> Dynamic loading</li>
    <li><FaCheckCircle /> Internationalization</li>
    <li><FaCheckCircle /> Redux with promise</li>
    <li><FaCheckCircle /> Socket Integration</li>
  </ul>
);

export default AppFeature;
