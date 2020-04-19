import { Reducer } from 'redux';
import producer from 'immer';

import * as actionTypes from './actionTypes';
import { ReduxAction, SocketState } from '../../types/redux';

const initialState: SocketState = {
  connected: false
};

export const socketReducer: Reducer<SocketState, ReduxAction> = (
  state: SocketState = initialState, action: ReduxAction
): SocketState => {
  const { type }: ReduxAction = action;

  return producer(state, (draft: SocketState): void => {
    switch (type) {
      case actionTypes.SOCKET_CONNECTED:
        draft.connected = true;
        break;
      case actionTypes.SOCKET_DISCONNECTED:
        draft.connected = false;
        break;
    }
  });
};

export default socketReducer;
