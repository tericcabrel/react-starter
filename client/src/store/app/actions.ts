import http, { AxiosResponse } from 'axios';

import { ApplicationError } from '../../types/common';
import { ReduxAction } from '../../types/redux';
import { SetGlobalErrorActionFn, VoidActionFn } from '../../types/function';

import * as actionTypes from './actionTypes';

import httpClient from '../../utils/http-client';
import LocalStorageManager from '../../utils/local-storage-manager';

export const setGlobalErrorAction: SetGlobalErrorActionFn = (data: ApplicationError | null): ReduxAction => {
  return {
    type: actionTypes.APP_GLOBAL_ERROR,
    payload: data
  };
};

export const getUserAction: VoidActionFn = (): ReduxAction => {
  return {
    type: actionTypes.USER_GET_CURRENT,
    async payload(): Promise<any> {
      try {
        const res: AxiosResponse = await httpClient.get('users/me');
        LocalStorageManager.saveUserInfo(res.data);

        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

export const logoutUserAction: VoidActionFn = (): ReduxAction => {
  LocalStorageManager.logoutUser();

  return {
    type: actionTypes.USER_LOGOUT,
    payload: null
  };
};

export const getAllCountriesAction: VoidActionFn = (): ReduxAction => {
  return {
    type: actionTypes.GET_ALL_COUNTRIES,
    async payload(): Promise<any> {
      try {
        const res: AxiosResponse = await http.get(`${process.env.REACT_APP_REST_COUNTRY_BASE_URL}/all?fields=name;alpha2Code`);

        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};
