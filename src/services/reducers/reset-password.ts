import {
  POST_NEW_PASSWORD_REQUEST,
  POST_NEW_PASSWORD_FAILED,
  POST_NEW_PASSWORD_SUCCESS,
} from "../constants/index";
import { TResetPasswordActions } from "../actions/reset-password";

type TResetPasswordState = {
  readonly newPassword: string | null;
  readonly newPasswordRequest: boolean;
  readonly newPasswordFailed: boolean;
};

const initialState: TResetPasswordState = {
  newPassword: null,
  newPasswordRequest: false,
  newPasswordFailed: false,
};

export const newPasswordReducer = (
  state = initialState,
  action: TResetPasswordActions
) => {
  switch (action.type) {
    case POST_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        newPasswordRequest: true,
      };
    }
    case POST_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        newPasswordRequest: false,
        newPasswordFailed: false,
      };
    }
    case POST_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        newPasswordFailed: true,
        newPasswordRequest: false,
      };
    }
    default:
      return state;
  }
};
