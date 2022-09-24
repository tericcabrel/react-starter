import { createStore, applyMiddleware, compose, Store, combineReducers, Reducer } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
// @ts-ignore
import dynamicMiddlewares, { addMiddleware } from 'redux-dynamic-middlewares';
import { io, Socket } from 'socket.io-client';

// Redux socket utilities
import socketIOEmitterMiddleware from './socket/socketIOEmitter';
import socketIOListener from './socket/socketIOListener';

// Reducers
import AuthReducer from './auth/reducer';
import AppReducer from './app/reducer';
import SocketReducer from './socket/reducer';

// Types
import { ReduxAction, RootState } from '../types/redux';
import { ConfigureStoreFn } from '../types/function';

declare var window: any;

const middlewares: any[] = [dynamicMiddlewares, thunk, promise];

const socketUrl: string|undefined = process.env.REACT_APP_SOCKET_URL;
const socketPath: string|undefined = process.env.REACT_APP_SOCKET_PATH;

// combined reducers
const reducers: Reducer<RootState | {}> = combineReducers<RootState | {}>({
  auth: AuthReducer,
  app: AppReducer,
  socket: SocketReducer,
});

export const configureStore: ConfigureStoreFn = (initialState?: RootState): Store<RootState, ReduxAction> => {
  let composeEnhancers: any;

  if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    composeEnhancers = compose;
  }

  const store: Store<RootState, ReduxAction> = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  // Configure socket
  let socket: Socket;

  const trySocketConnect: () => void = (): void => {
    if (socket) socket.close();

    if (!socketPath) {
      socket = io(`${socketUrl}`);
    } else {
      socket = io(`${socketUrl}`, { path: socketPath });
    }
    socketIOListener(socket, store, trySocketConnect);

    socket.on('connect', (): void => {
      addMiddleware(socketIOEmitterMiddleware(socket));
    });
  };

  trySocketConnect();

  return store;
};
