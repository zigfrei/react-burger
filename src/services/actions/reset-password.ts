import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/functions";
import {
  POST_NEW_PASSWORD_REQUEST,
  POST_NEW_PASSWORD_FAILED,
  POST_NEW_PASSWORD_SUCCESS,
} from "../constants/index";
import { AppDispatch, AppThunk } from "../types";

export interface IPostNewPasswordRequestAction {
  readonly type: typeof POST_NEW_PASSWORD_REQUEST;
}

export interface IPostNewPasswordSuccessAction {
  readonly type: typeof POST_NEW_PASSWORD_SUCCESS;
}

export interface IPostNewPasswordFailedAction {
  readonly type: typeof POST_NEW_PASSWORD_FAILED;
}

export const postNewPasswordRequest = (): IPostNewPasswordRequestAction => ({
  type: POST_NEW_PASSWORD_REQUEST,
});

export const postNewPasswordSuccess = (): IPostNewPasswordSuccessAction => ({
  type: POST_NEW_PASSWORD_SUCCESS,
});

export const postNewPasswordFailed = (): IPostNewPasswordFailedAction => ({
  type: POST_NEW_PASSWORD_FAILED,
});

export type TResetPasswordActions =
  | IPostNewPasswordRequestAction
  | IPostNewPasswordSuccessAction
  | IPostNewPasswordFailedAction;

export const postNewPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(postNewPasswordRequest());
    fetch(`${baseUrl}password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch(postNewPasswordSuccess());
          console.log(res);
          console.log(password, token);
        } else {
          dispatch(postNewPasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(postNewPasswordFailed());
      });
  };
};
