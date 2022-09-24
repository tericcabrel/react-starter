import { Store } from 'redux';
import { Socket } from 'socket.io-client';

import {
  ConfirmAccountData,
  ForgotPasswordData,
  LoginData,
  ReduxAction,
  RegisterData,
  ResetPasswordVerifyData,
  RootState
} from './redux';
import { ApplicationError } from './common';
import { Country } from './model';

export type ConfigureStoreFn = (initialState?: RootState) => Store<RootState, ReduxAction>;
export type ConfigureSocketFn = (
  socket: Socket, store: Store<RootState, ReduxAction>, trySocketConnect: () => void
) => void;

export type VoidActionFn = () => ReduxAction;
export type ResetAuthStateActionFn = () => ReduxAction;
export type RegisterUserActionFn = (data: RegisterData) => ReduxAction;
export type ConfirmAccountActionFn = (data: ConfirmAccountData) => ReduxAction;
export type LoginUserActionFn = (data: LoginData) => ReduxAction;
export type ForgotPasswordActionFn = (data: ForgotPasswordData) => ReduxAction;
export type ResetPasswordActionFn = (data: ResetPasswordVerifyData) => ReduxAction;
export type SetGlobalErrorActionFn = (data: ApplicationError | null) => ReduxAction;

export type GetCountryInfoRequestActionFn = (countryCode: string|null) => ReduxAction;
export type GetCountryInfoResponseActionFn = (data: Country | null) => ReduxAction;
