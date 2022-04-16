import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_FAILED,
  POST_LOGIN_SUCCESS,
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILED,
  POST_REGISTER_SUCCESS,
  POST_TOKEN_UPDATE_REQUEST,
  POST_TOKEN_UPDATE_FAILED,
  POST_TOKEN_UPDATE_SUCCESS,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_FAILED,
  POST_LOGOUT_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  PATCH_USER_REQUEST,
  PATCH_USER_FAILED,
  PATCH_USER_SUCCESS,
  CLEAR_AUTHORIZATION,
} from "../actions/auth";

const initialState = {
  accessToken: null,
  userName: '',
  userEmail: '',
  userPassword: '',
  loginRequestState: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  tokenRequest: false,
  tokenFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  authorizationSuccess: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequestState: true,
      };
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequestState: false,
        accessToken: action.accessToken,

        loginFailed: false,
      };
    }
    case POST_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequestState: false,
      };
    }
    case POST_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case POST_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        accessToken: action.accessToken,

        registerFailed: false,
      };
    }
    case POST_REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    case POST_TOKEN_UPDATE_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
      };
    }
    case POST_TOKEN_UPDATE_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        accessToken: action.accessToken,

        tokenFailed: false,
      };
    }
    case POST_TOKEN_UPDATE_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        tokenRequest: false,
      };
    }
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        accessToken: '',

        logoutFailed: false,
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
    case POST_LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        authorizationSuccess: action.authorizationSuccesss,
          userName: action.userName,
          userEmail: action.userEmail,

      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserSuccess: false,
        getUserFailed: true,
        getUserRequest: false,
      };
    }
    case PATCH_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
          userName: action.userName,
          userEmail: action.userEmail,

      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
