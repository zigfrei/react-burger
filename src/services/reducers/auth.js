import {
  AUTH_REQUEST,
  AUTH_FAILED,

  POST_LOGIN_SUCCESS,
  POST_REGISTER_SUCCESS,
  POST_TOKEN_UPDATE_SUCCESS,
  POST_LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  PATCH_USER_SUCCESS,
  CLEAR_AUTHORIZATION,


} from "../actions/auth";

const initialState = {
  accessToken: null,
  userName: '',
  userEmail: '',
  userPassword: '',
  requestState: false,
  authFailed: false,

  authorizationSuccess: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        requestState: true,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authFailed: true,
        requestState: false,
      };
    }

    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        requestState: false,
        accessToken: action.accessToken,
        authFailed: false,
      };
    }


    case POST_REGISTER_SUCCESS: {
      return {
        ...state,
        requestState: false,
        accessToken: action.accessToken,
        authFailed: false,
      };
    }

    case POST_TOKEN_UPDATE_SUCCESS: {
      return {
        ...state,
        requestState: false,
        accessToken: action.accessToken,

        authFailed: false,
      };
    }

    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        requestState: false,
        accessToken: '',

        authFailed: false,
      };
    }
    case CLEAR_AUTHORIZATION: {
      return{
        ...state,
        accessToken: '',
        userName: '',
  userEmail: '',
  userPassword: '',
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        requestState: false,
        authFailed: false,
        authorizationSuccess: action.authorizationSuccesss,
          userName: action.userName,
          userEmail: action.userEmail,

      };
    }

    case PATCH_USER_SUCCESS: {
      return {
        ...state,
          userName: action.userName,
          userEmail: action.userEmail,

      };
    }
    default:
      return state;
  }
};
