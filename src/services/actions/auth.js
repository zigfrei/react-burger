import { baseUrl } from "../../utils/constants";
import { deleteCookie, setCookie, getCookie, isTokenExpired } from "../../utils/cookie";
import {checkResponse, checkSuccess} from '../../utils/functions'

export const AUTH_REQUEST = "AUTH_REQUEST";
function authRequest() {
  return { type: AUTH_REQUEST }
}
export const AUTH_FAILED = "AUTH_FAILED";
function authFailed() {
  return { type: AUTH_FAILED }
}
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_TOKEN_UPDATE_SUCCESS = "POST_TOKEN_UPDATE_SUCCESS";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const CLEAR_AUTHORIZATION = "CLEAR_AUTHORIZATION";

export function loginRequest(form) {
  return function (dispatch) {
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
          dispatch(getUser());
          dispatch({
            type: POST_LOGIN_SUCCESS,
          });
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        console.log("Повторите ввод логина и пароля");
        dispatch(authFailed());
      });
  };
}


export function postRegister(form) {
  return function (dispatch) {
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
          dispatch(getUser());
          dispatch({
            type: POST_REGISTER_SUCCESS,
          });
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
}

export function tokenUpdate() {
  return function (dispatch) {
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
          dispatch({
            type: POST_TOKEN_UPDATE_SUCCESS,
          });
        } else {
          dispatch(authFailed());
        }
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
}

export function logoutRequest() {
  return function (dispatch) {
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
          dispatch({
            type: POST_LOGOUT_SUCCESS,
            type: CLEAR_AUTHORIZATION,
          });
        } else {
          dispatch(authFailed());
        }
        return res;
      })
      .catch((err) => {
        dispatch(authFailed());
      });
  };
}

export function getUser() {
  return function (dispatch) {
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
          dispatch({
            type: GET_USER_SUCCESS,
            userName: res.user.name,
            userEmail: res.user.email,
            isLoggedIn: res.success,
          });
          console.log("tut");
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
}

export function getUserToken() {
  console.log("тут начинается оюновление токена", localStorage.getItem("refreshToken"));
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
            };
            console.log("user token two");
            return res;
          }
        })
        .then((res) =>{
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
          dispatch({
            type: GET_USER_SUCCESS,
            userName: res.user.name,
            userEmail: res.user.email,
            isLoggedIn: res.success,
          });
        } else {
          dispatch(authFailed());
        }
      })})
      .catch((err) => {
        dispatch(authFailed());
      });
  };
}

export function patchUser(name, email, password) {
  console.log(name, email, password);
  return function (dispatch) {
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
          dispatch({
            type: PATCH_USER_SUCCESS,
            userName: res.user.name,
            userEmail: res.user.email,
          });
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
}

export function patchUserToken(name, email, password) {
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
              };
              return res;
            }
          })
    .then(res => {fetch(`${baseUrl}auth/user`, {
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
          dispatch({
            type: PATCH_USER_SUCCESS,
            userName: res.user.name,
            userEmail: res.user.email,
          });
        } else {
          dispatch(authFailed());
        }
      })})
      .catch((err) => {
        dispatch(authFailed());
      });
  };
}
