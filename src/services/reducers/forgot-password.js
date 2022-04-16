import {
  POST_PASSWORD_RESET_REQUEST,
  POST_PASSWORD_RESET_FAILED,
  POST_PASSWORD_RESET_SUCCESS,
} from "../actions/forgot-password";

const initialState = {
  passwordReset: null,
  passwordResetRequest: false,
  passwordResetFailed: false,
};

export const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case  POST_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
      };
    }
    case POST_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordReset: action.passwordReset,
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
