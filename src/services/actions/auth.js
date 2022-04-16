import { baseUrl } from "../../utils/constants";
import { deleteCookie, setCookie, getCookie, isTokenExpired } from "../../utils/cookie";

export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const POST_LOGIN_FAILED = "POST_LOGIN_FAILED";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_TOKEN_UPDATE_REQUEST = "POST_TOKEN_UPDATE_REQUEST";
export const POST_TOKEN_UPDATE_FAILED = "POST_TOKEN_UPDATE_FAILED";
export const POST_TOKEN_UPDATE_SUCCESS = "POST_TOKEN_UPDATE_SUCCESS";
export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_FAILED = "POST_LOGOUT_FAILED";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const CLEAR_AUTHORIZATION = "CLEAR_AUTHORIZATION";

export function loginRequest(form) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });
    fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          dispatch({
            type: POST_LOGIN_SUCCESS,
            accessToken: res.accessToken,
          });
        } else {
          dispatch({
            type: POST_LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log("Повторите ввод логина и пароля");
        dispatch({
          type: POST_LOGIN_FAILED,
        });
      });
  };
}

export function postRegister(form) {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });
    fetch(`${baseUrl}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          dispatch({
            type: POST_REGISTER_SUCCESS,
            accessToken: res.accessToken,
          });
        } else {
          dispatch({
            type: POST_REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTER_FAILED,
        });
      });
  };
}

export function postTokenUpdate() {
  return function (dispatch) {
    dispatch({
      type: POST_TOKEN_UPDATE_REQUEST,
    });
    fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: `${localStorage.getItem("refreshToken")}`,
      }),
    })
      .then(function (res) {
        console.log(
          "tokeni",
          localStorage.getItem("refreshToken"),
          getCookie("token")
        );
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
      .then((res) => {
        if (res && res.success) {
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
          }
          dispatch({
            type: POST_TOKEN_UPDATE_SUCCESS,
            accessToken: res.accessToken,
          });
        } else {
          dispatch({
            type: POST_TOKEN_UPDATE_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_TOKEN_UPDATE_FAILED,
        });
      });
  };
}

export function logoutRequest() {
  return function (dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });
    fetch(`${baseUrl}auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: `${localStorage.getItem("refreshToken")}`,
      }),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
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
          dispatch({
            type: POST_LOGOUT_FAILED,
          });
        }
        return res;
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGOUT_FAILED,
        });
      });
  };
}

export function getUser() {

  return function (dispatch) {
    if (isTokenExpired( getCookie("token"))){
  dispatch(postTokenUpdate());
};
    dispatch({
      type: GET_USER_REQUEST,
    });
    fetch(`${baseUrl}auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(function (res) {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        if (res.status === 403) {
          dispatch(postTokenUpdate());
          console.log("rabotaem");
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            userName: res.user.name,
            userEmail: res.user.email,
            authorizationSuccess: res.success,
          });
          console.log("tut");
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);

        console.log("Пройдите авторизацию");
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}

export function patchUser(name, email, password) {
  console.log(name, email, password);
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
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
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 403) {
          dispatch(postTokenUpdate());
          console.log("ошибка 403 обновил токен");
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        console.log("Замена инфы", res);
        if (res && res.success) {
          dispatch({
            type: PATCH_USER_SUCCESS,
            userName: res.user.name,
            userEmail: res.user.email,
          });

        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);

        console.log("Пройдите авторизацию");
        dispatch({
          type: PATCH_USER_FAILED,
        });
      });
  };
}
