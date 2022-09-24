import { Store } from 'redux';
import { Socket } from 'socket.io-client';

import { ApplicationError } from '../../types/common';
import { Country } from '../../types/model';
import { ReduxAction, SocketRequestAction, SocketResponse, RootState } from '../../types/redux';
import { ConfigureSocketFn } from '../../types/function';

import { socketDisconnectedAction, socketConnectedAction, getCountryInfoResponseAction } from './actions';
import { setGlobalErrorAction } from '../app/actions';

import { parseSocketResponseMessage } from '../../utils/helpers';
import { SOCKET_RESPONSE_EVENT } from '../../utils/constants';

const socketConfigure: ConfigureSocketFn = (
  socket: Socket,
  store: Store<RootState, ReduxAction>,
  trySocketConnect: () => void
): void => {
  socket.on('connect', (): void => {
    console.log('Connected to socket server !');
    store.dispatch(socketConnectedAction());
  });

  socket.on(SOCKET_RESPONSE_EVENT, (data: string): void => {
    console.log('Socket Response : ', data);

    const response : SocketResponse | ApplicationError = parseSocketResponseMessage(data);

    if (response.hasOwnProperty('errorType')) {
      store.dispatch(setGlobalErrorAction(response as ApplicationError));

      return;
    }

    // const appState = store.getState().app;
    const socketResponse: SocketResponse = response as SocketResponse;

    switch (socketResponse.rqid) {
      case SocketRequestAction.GET_COUNTRY_INFO_REQUEST:
        store.dispatch(getCountryInfoResponseAction(socketResponse.data as Country));
        break;
      default:
        console.log('Unknown socket action !');
        break;
    }
  });

  socket.on('disconnect', (): void => {
    store.dispatch(socketDisconnectedAction());
    trySocketConnect();
  });
};

export default socketConfigure;
