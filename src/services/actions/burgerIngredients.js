import { baseUrl } from "../../utils/constants";
import {checkResponse, checkSuccess} from '../../utils/functions';

export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_SUCCESS = "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_FAILED = "GET_BURGER_INGREDIENTS_FAILED";
export const CHANGE_TUB = 'CHANGE_TUB';

export function getBurgerIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });
    fetch(`${baseUrl}ingredients`)
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            burgerIngredients: res.data,
          });
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED,
        });
      });
  };
}
