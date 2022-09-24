import { Dispatch } from 'redux';
import { Socket } from 'socket.io-client';

import { ReduxAction } from '../../types/redux';

const socketIOEmitter: any = (socket: Socket): any => (obj: any): any => {
  return (next: Dispatch<ReduxAction>): any => (action: ReduxAction): any => {
    // Capture socket's action only. The action's type are prefixed by SCK
    if (action.type.startsWith('SCK')) {
      console.log('Socket data sent : ', action);
    }

    if (action.meta && action.meta.socket && action.meta.socket.channel) {
      socket.emit(action.meta.socket.channel, action.payload);
    }

    return next(action);
  };
};

export default socketIOEmitter;
