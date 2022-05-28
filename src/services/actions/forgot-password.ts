import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/functions";

import {
  POST_PASSWORD_RESET_REQUEST,
  POST_PASSWORD_RESET_FAILED,
  POST_PASSWORD_RESET_SUCCESS,
} from "../constants";
import { AppDispatch, AppThunk } from "../types";

export interface IPostPasswordResetRequestAction {
  readonly type: typeof POST_PASSWORD_RESET_REQUEST;
}

export interface IPostPasswordResetFailedAction {
  readonly type: typeof POST_PASSWORD_RESET_FAILED;
}

export interface IPostPasswordResetSuccessAction {
  readonly type: typeof POST_PASSWORD_RESET_SUCCESS;
}

export type TForgotPasswordActions =
  | IPostPasswordResetRequestAction
  | IPostPasswordResetFailedAction
  | IPostPasswordResetSuccessAction;

export const postPasswordResetRequest =
  (): IPostPasswordResetRequestAction => ({
    type: POST_PASSWORD_RESET_REQUEST,
  });

export const postPasswordFailed = (): IPostPasswordResetFailedAction => ({
  type: POST_PASSWORD_RESET_FAILED,
});

export const postPasswordResetSuccess =
  (): IPostPasswordResetSuccessAction => ({
    type: POST_PASSWORD_RESET_SUCCESS,
  });

export const postPasswordReset: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(postPasswordResetRequest());
    fetch(`${baseUrl}password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("resetToken", "true");
          console.log("action");
          dispatch(postPasswordResetSuccess());
          console.log(res);
        } else {
          dispatch(postPasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(postPasswordFailed());
      });
  };
};
