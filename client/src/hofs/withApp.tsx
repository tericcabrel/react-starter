import React, { FC, ReactElement, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { AppState, RootState } from '../types/redux';

import { setGlobalErrorAction } from '../store/app/actions';

import ErrorHandler from '../components/ErrorHandler';
import AppError from '../components/AppError';

// styles
import './hofs.scss';

// @ts-ignore
const withApp: WithAppType = (Wrapped: FC<any>): () => ReactElement => {
  return (): ReactElement => {
    // tslint:disable-next-line:react-hooks-nesting
    const dispatch: Dispatch = useDispatch();
    // tslint:disable-next-line:react-hooks-nesting
    const { error }: AppState = useSelector((state: RootState): AppState => state.app);

    // tslint:disable-next-line:react-hooks-nesting
    useEffect((): void => {
      const rootId: HTMLElement|null = document.getElementById('root');

      if (rootId !== null) {
        // remove the background image set on the root element
        rootId.style.background = 'none';
      }
    },        []);

    const resetError: () => void = (): void => {
      dispatch(setGlobalErrorAction(null));
    };

    return (
      <div className="app-container">
        <ErrorHandler>
          <Wrapped/>
        </ErrorHandler>

        <AppError error={error} onClose={resetError}/>
      </div>
    );
  };
};

export default withApp;
