import { baseUrl } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const CLEAR_ORDER = 'CLEAR_ORDER';

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
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
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
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
