import { Reducer } from 'redux';
import producer from 'immer';

import { ReduxAction, AuthState } from '../../types/redux';

import * as actionTypes from './actionTypes';

const initialState: AuthState = {
  loading: false,
  success: false,
  accountConfirmed: false,
  error: null, // 'Internal server error'
};

const authReducer: Reducer<AuthState, ReduxAction> = (
  state: AuthState = initialState, action: ReduxAction
): AuthState => {
  const { type, payload }: any = action;

  return producer(state, (draft: AuthState): void => {
    switch (type) {
      // Reset state's values
      case actionTypes.AUTH_RESET_STATE:
        draft.error = initialState.error;
        break;

      // Registration
      case `${actionTypes.USER_REGISTER}_PENDING`:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        break;
      case `${actionTypes.USER_REGISTER}_FULFILLED`:
        draft.loading = false;
        draft.success = true;
        break;
      case `${actionTypes.USER_REGISTER}_REJECTED`:
        draft.loading = false;
        draft.error = payload;
        break;

      // Account confirmation
      case `${actionTypes.USER_CONFIRM_ACCOUNT}_PENDING`:
        draft.loading = true;
        draft.accountConfirmed = false;
        draft.error = null;
        break;
      case `${actionTypes.USER_CONFIRM_ACCOUNT}_FULFILLED`:
        draft.loading = false;
        draft.accountConfirmed = true;
        break;
      case `${actionTypes.USER_CONFIRM_ACCOUNT}_REJECTED`:
        draft.loading = false;
        draft.error = payload;
        break;

      // Authentication
      case `${actionTypes.USER_LOGIN}_PENDING`:
        draft.loading = true;
        draft.error = null;
        break;
      case `${actionTypes.USER_LOGIN}_FULFILLED`:
        draft.loading = false;
        break;
      case `${actionTypes.USER_LOGIN}_REJECTED`:
        draft.loading = false;
        draft.error = payload;
        break;

      // Forgot password
      case `${actionTypes.USER_FORGOT_PASSWORD}_PENDING`:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        break;
      case `${actionTypes.USER_FORGOT_PASSWORD}_FULFILLED`:
        draft.loading = false;
        draft.success = true;
        break;
      case `${actionTypes.USER_FORGOT_PASSWORD}_REJECTED`:
        draft.loading = false;
        draft.success = false;
        draft.error = payload;
        break;

      // Reset password
      case `${actionTypes.USER_RESET_PASSWORD}_PENDING`:
        draft.loading = true;
        draft.success = false;
        draft.error = null;
        break;
      case `${actionTypes.USER_RESET_PASSWORD}_FULFILLED`:
        draft.loading = false;
        draft.success = true;
        break;
      case `${actionTypes.USER_RESET_PASSWORD}_REJECTED`:
        draft.loading = false;
        draft.success = false;
        draft.error = payload;
        break;
    }
  });
};

export default authReducer;
