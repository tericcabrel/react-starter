import { AxiosResponse } from 'axios';
import httpClient from '../../utils/http-client';
import * as actionTypes from './actionTypes';
import {
  ConfirmAccountData, LoginSuccessResponse, ReduxAction,
  RegisterData, LoginData, ForgotPasswordData, ResetPasswordVerifyData
} from '../../types/redux';
import LocalStorageManager from '../../utils/local-storage-manager';
import {
  ConfirmAccountActionFn, ForgotPasswordActionFn, LoginUserActionFn,
  RegisterUserActionFn, ResetAuthStateActionFn, ResetPasswordActionFn
} from '../../types/function';

export const resetAuthStateAction: ResetAuthStateActionFn = (): ReduxAction => {
  return {
    type: actionTypes.AUTH_RESET_STATE,
    payload: null,
  };
};

export const registerUserAction: RegisterUserActionFn = (data: RegisterData): ReduxAction => {
  return {
    type: actionTypes.USER_REGISTER,
    async payload(): Promise<any> {
      try {
        const res: AxiosResponse = await httpClient.post('auth/register', data);

        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

export const confirmAccountAction: ConfirmAccountActionFn = (data: ConfirmAccountData): ReduxAction => {
  return {
    type: actionTypes.USER_CONFIRM_ACCOUNT,
    async payload(): Promise<any> {
      try {
        const res: AxiosResponse = await httpClient.post('auth/account/confirm', data);

        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

export const loginUserAction: LoginUserActionFn = (data: LoginData): ReduxAction => {
  return {
    type: actionTypes.USER_LOGIN,
    async payload(): Promise<any> {
      try {
        const res: AxiosResponse = await httpClient.post('auth/login', data);
        const loginResponse: LoginSuccessResponse = res.data;

        LocalStorageManager.saveUserAccessToken(loginResponse.token, loginResponse.expiresIn / (3600 * 24));
        LocalStorageManager.saveUserRefreshToken(loginResponse.refreshToken);

        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

export const forgotPasswordAction: ForgotPasswordActionFn = (data: ForgotPasswordData): ReduxAction => {
  return {
    type: actionTypes.USER_FORGOT_PASSWORD,
    async payload(): Promise<any> {
      try {
        const res: AxiosResponse = await httpClient.post('auth/password/forgot', data);

        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

export const resetPasswordAction: ResetPasswordActionFn = (data: ResetPasswordVerifyData): ReduxAction => {
  return {
    type: actionTypes.USER_RESET_PASSWORD,
    async payload(): Promise<any> {
      try {
        const res: AxiosResponse = await httpClient.post('auth/password/reset', data);

        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};
