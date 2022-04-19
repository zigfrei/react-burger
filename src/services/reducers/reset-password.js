import {
  POST_NEW_PASSWORD_REQUEST,
  POST_NEW_PASSWORD_FAILED,
  POST_NEW_PASSWORD_SUCCESS,
} from "../actions/reset-password";

const initialState = {
  newPassword: null,
  newPasswordRequest: false,
  newPasswordFailed: false,
};

export const newPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case  POST_NEW_PASSWORD_REQUEST: {
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
