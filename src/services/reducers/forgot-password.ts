import {
  POST_PASSWORD_RESET_REQUEST,
  POST_PASSWORD_RESET_FAILED,
  POST_PASSWORD_RESET_SUCCESS,
} from "../constants";
import { TForgotPasswordActions } from "../actions/forgot-password";

type TForgotPasswordState = {
  readonly passwordResetRequest: boolean;
  readonly passwordResetFailed: boolean;
};

const initialState: TForgotPasswordState = {
  passwordResetRequest: false,
  passwordResetFailed: false,
};

export const passwordResetReducer = (
  state = initialState,
  action: TForgotPasswordActions
) => {
  switch (action.type) {
    case POST_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
      };
    }
    case POST_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: false,
      };
    }
    case POST_PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetFailed: true,
        passwordResetRequest: false,
      };
    }
    default:
      return state;
  }
};
