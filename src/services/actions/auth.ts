import { baseUrl } from "../../utils/constants";
import {
  deleteCookie,
  setCookie,
  getCookie,
  isTokenExpired,
} from "../../utils/cookie";
import { checkResponse } from "../../utils/functions";

import { TUser } from "../types/data";
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
} from "../constants/index";
import { AppDispatch, AppThunk } from "../types";

export interface IAuthRequestAction {
  readonly type: typeof AUTH_REQUEST;
}

export interface IAuthFailedtAction {
  readonly type: typeof AUTH_FAILED;
}

export interface IPostLoginSuccessAction {
  readonly type: typeof POST_LOGIN_SUCCESS;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
}

export interface IPostTokenUpdateSuccessAction {
  readonly type: typeof POST_TOKEN_UPDATE_SUCCESS;
}

export interface IPostLogoutSuccessAction {
  readonly type: typeof POST_LOGOUT_SUCCESS;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly userName: string;
  readonly userEmail: string;
  readonly isLoggedIn: boolean;
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly userName: string;
  readonly userEmail: string;
}

export interface IClearAuthorizationAction {
  readonly type: typeof CLEAR_AUTHORIZATION;
}

export type TAuthActions =
  | IAuthRequestAction
  | IAuthFailedtAction
  | IPostLoginSuccessAction
  | IPostRegisterSuccessAction
  | IPostTokenUpdateSuccessAction
  | IPostLogoutSuccessAction
  | IGetUserSuccessAction
  | IPatchUserSuccessAction
  | IClearAuthorizationAction;

export const authRequest = (): IAuthRequestAction => ({
  type: AUTH_REQUEST,
});

export const authFailed = (): IAuthFailedtAction => ({
  type: AUTH_FAILED,
});

export const postLoginSuccess = (): IPostLoginSuccessAction => ({
  type: POST_LOGIN_SUCCESS,
});

export const postRegisterSuccess = (): IPostRegisterSuccessAction => ({
  type: POST_REGISTER_SUCCESS,
});

export const postTokenUpdateSuccess = (): IPostTokenUpdateSuccessAction => ({
  type: POST_TOKEN_UPDATE_SUCCESS,
});

export const postLogoutSuccess = (): IPostLogoutSuccessAction => ({
  type: POST_LOGOUT_SUCCESS,
});

export const getUserSuccess = (
  userName: string,
  userEmail: string,
  isLoggedIn: boolean
): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  userName,
  userEmail,
  isLoggedIn,
});

export const patchUserSuccesss = (
  userName: string,
  userEmail: string
): IPatchUserSuccessAction => ({
  type: PATCH_USER_SUCCESS,
  userEmail,
  userName,
});

export const clearAuthorization = (): IClearAuthorizationAction => ({
  type: CLEAR_AUTHORIZATION,
});

export const loginRequest: AppThunk = (form: TUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          localStorage.setItem("refreshToken", res.refreshToken);
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          dispatch(getUserSuccess(res.user.name, res.user.email, res.success));
          dispatch(postLoginSuccess());
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        console.log("Повторите ввод логина и пароля");
        dispatch(authFailed());
      });
  };
};

export const postRegister: AppThunk = (form: TUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          dispatch(getUserSuccess(res.user.name, res.user.email, res.success));
          dispatch(postRegisterSuccess());
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
};

export const tokenUpdate: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: `${localStorage.getItem("refreshToken")}`,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          dispatch(postTokenUpdateSuccess());
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
};

export const logoutRequest: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: `${localStorage.getItem("refreshToken")}`,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("resetToken");
          deleteCookie("token");
          dispatch(postLogoutSuccess());
          dispatch(clearAuthorization());
        } else {
          dispatch(authFailed());
        }
        return res;
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
};

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch(getUserSuccess(res.user.name, res.user.email, res.success));
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Пройдите авторизацию");
        dispatch(authFailed());
      });
  };
};

export const getUserToken: AppThunk = () => {
  console.log(
    "тут начинается оюновление токена",
    localStorage.getItem("refreshToken")
  );
  return function (dispatch: AppDispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          console.log("user token two");
          return res;
        }
      })
      .then((res) => {
        fetch(`${baseUrl}auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
        })
          .then(checkResponse)
          .then((res) => {
            if (res && res.success) {
              dispatch(
                getUserSuccess(res.user.name, res.user.email, res.success)
              );
            } else {
              dispatch(authFailed());
            }
          });
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
};

export const patchUser: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  console.log(name, email, password);
  return function (dispatch: AppDispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        console.log("Замена инфы", res);
        if (res && res.success) {
          dispatch(patchUserSuccesss(res.user.name, res.user.email));
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Пройдите авторизацию");
        dispatch(authFailed());
      });
  };
};

export const patchUserToken: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch) {
    dispatch(authRequest());
    fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          return res;
        }
      })
      .then((res) => {
        fetch(`${baseUrl}auth/user`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        })
          .then(checkResponse)
          .then((res) => {
            if (res && res.success) {
              dispatch(patchUserSuccesss(res.user.name, res.user.email));
            } else {
              dispatch(authFailed());
            }
          });
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
};
