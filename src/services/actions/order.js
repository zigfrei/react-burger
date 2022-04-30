import { baseUrl } from "../../utils/constants";
import { getCookie, setCookie } from "../../utils/cookie";
import { checkResponse, checkSuccess } from "../../utils/functions";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function getOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(`${baseUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
        console.log("order one");
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export function getOrderToken(ingredients) {
  console.log(localStorage.getItem("refreshToken"));
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
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
          console.log("order two");
          return res;
        }
      })
      .then((res) => {
        fetch(`${baseUrl}orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: res.accessToken,
          },
          body: JSON.stringify({
            ingredients: ingredients,
          }),
        })
          .then(checkResponse)
          .then((res) => {
            if (res && res.success) {
              dispatch({
                type: GET_ORDER_SUCCESS,
                order: res.order.number,
              });
            } else {
              dispatch({
                type: GET_ORDER_FAILED,
              });
            }
          });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
