import * as actionTypes from './actionTypes';
import { SOCKET_REQUEST_EVENT } from '../../utils/constants';
import { ReduxAction, SocketRequestAction } from '../../types/redux';
import { Country } from '../../types/model';
import {
  GetCountryInfoRequestActionFn, GetCountryInfoResponseActionFn, VoidActionFn
} from '../../types/function';

export const socketConnectedAction: VoidActionFn = (): ReduxAction => {
  return {
    type: actionTypes.SOCKET_CONNECTED,
    payload: null
  };
};

export const socketDisconnectedAction: VoidActionFn = (): ReduxAction => {
  return {
    type: actionTypes.SOCKET_DISCONNECTED,
    payload: null
  };
};

export const getCountryInfoRequestAction: GetCountryInfoRequestActionFn = (countryCode: string|null): ReduxAction => {
  return {
    type: actionTypes.GET_COUNTRY_INFO_REQUEST,
    payload: JSON.stringify({
      rqid: SocketRequestAction.GET_COUNTRY_INFO_REQUEST,
      code: countryCode
    }),
    meta: {
      socket: {
        channel: SOCKET_REQUEST_EVENT
      }
    }
  };
};

export const getCountryInfoResponseAction: GetCountryInfoResponseActionFn = (data: Country | null): ReduxAction => {
  return {
    type: actionTypes.GET_COUNTRY_INFO_RESPONSE,
    payload: data
  };
};
