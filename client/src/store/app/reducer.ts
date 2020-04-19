import { Reducer } from 'redux';
import producer from 'immer';

import * as actionTypes from './actionTypes';
import * as socketActionTypes from '../socket/actionTypes';

import { ReduxAction, AppState } from '../../types/redux';
import { ApplicationError } from '../../types/common';
import { Country } from '../../types/model';

import LocalStorageManager from '../../utils/local-storage-manager';

const initialState: AppState = {
  loading: false,
  error: null,
  user: LocalStorageManager.getUserInfo(),
  country: null,
  countries: []
};

export const appReducer: Reducer<AppState, ReduxAction> = (
  state: AppState = initialState, action: ReduxAction
): AppState => {
  const { type, payload }: any = action;

  return producer(state, (draft: AppState): void => {
    switch (type) {
      // Global error
      case actionTypes.APP_GLOBAL_ERROR:
        draft.error = payload as ApplicationError;
        draft.loading = false;
        break;

      // User
      case `${actionTypes.USER_GET_CURRENT}_FULFILLED`:
        draft.user = payload;
        break;
      case actionTypes.USER_LOGOUT:
        draft.user = null;
        break;

      // Get all countries
      case `${actionTypes.GET_ALL_COUNTRIES}_FULFILLED`:
        draft.countries = payload as Country[];
        break;
      case `${actionTypes.GET_ALL_COUNTRIES}_REJECTED`:
        draft.error = payload as any;
        break;

      case socketActionTypes.GET_COUNTRY_INFO_REQUEST:
        draft.loading = true;
        break;

      case socketActionTypes.GET_COUNTRY_INFO_RESPONSE:
        draft.loading = false;
        draft.country = payload as Country;
        break;
    }
  });
};

export default appReducer;
