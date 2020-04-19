import { Action } from 'redux';

import { ApplicationError } from './common';
import { Country, FilteredCountry, User } from './model';

export interface ReduxAction extends Action {
  type: string;
  payload: any;
  meta?: {
    socket: {
      channel: string,
    }
  };
}

export enum SocketRequestAction {
  GET_COUNTRY_INFO_REQUEST = 'SCK001',
}

export type RootState = {
  auth: AuthState,
  app: AppState,
  socket: SocketState,
};

export type AuthState = {
  loading: boolean,
  success: boolean,
  accountConfirmed: boolean,
  error: Object | null,
};

export type AppState = {
  loading: boolean,
  error: ApplicationError | null,
  user: User | null,
  country: Country | null,
  countries: FilteredCountry[]
};

export type SocketState = {
  connected: boolean;
};

export type SocketResponse = {
  rqid: string,
  data: Object,
  error?: { [key: string]: [string] } | null
};

export type LoginData = {
  email: string,
  password: string
};

export type RegisterData = {
  email: string,
  password: string,
  username: string,
  name: string,
  confirmPassword: string
};

export type ForgotPasswordData = {
  email: string
};

export type ResetPasswordData = {
  password: string,
  confirmPassword: string
};

/**
 * When the server return the 422 status code, the errors has this format
 * Eg: { errors: { "email": ["This email already taken"], name: ["At least 6 characters", ...], .... }}
 */
export type InvalidDataResponse = {
  errors: {
    [key: string]: string[]
  }
};

export type ConfirmAccountData = {
  token: string
};

export type LoginSuccessResponse = {
  token: string,
  expiresIn: number,
  refreshToken: string
};

export type ResetPasswordVerifyData = {
  password: string,
  reset_token: string|null
};
