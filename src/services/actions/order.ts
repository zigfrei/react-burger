import { baseUrl } from "../../utils/constants";
import { getCookie, setCookie } from "../../utils/cookie";
import { checkResponse } from "../../utils/functions";
import { AppDispatch, AppThunk } from "../types";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  CLEAR_ORDER,
} from "../constants/index";

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: string[];
}

export interface IClearOrdertAction {
  readonly type: typeof CLEAR_ORDER;
}

export const getOrderRequest = (): IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderFailed = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
});

export const getOrderSuccess = (order: string[]): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  order,
});

export const clearOrder = (): IClearOrdertAction => ({
  type: CLEAR_ORDER,
});

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderFailedAction
  | IGetOrderSuccessAction
  | IClearOrdertAction;

export const getOrder: AppThunk = (ingredients: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
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
          dispatch(getOrderSuccess(res.order.number));
        } else {
          dispatch(getOrderFailed());
        }
        console.log("order one");
      })
      .catch((err) => {
        dispatch(getOrderFailed());
      });
  };
};

export const getOrderToken: AppThunk = (ingredients: string[]) => {
  console.log(localStorage.getItem("refreshToken"));
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
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
              dispatch(getOrderSuccess(res.order.number));
            } else {
              dispatch(getOrderFailed());
            }
          });
      })
      .catch((err) => {
        dispatch(getOrderFailed());
      });
  };
};
