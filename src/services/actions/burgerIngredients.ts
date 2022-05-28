import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/functions";
import { TburgerIngredients, TTabCurrent } from "../types/data";
import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
  CHANGE_TUB,
} from "../constants";
import { AppDispatch, AppThunk } from "../types";

export interface IGetBurgerIngredientRequestAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IGetBurgerIngredientSuccessAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  burgerIngredients: TburgerIngredients[];
}

export interface IGetBurgerIngredientFailedAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_FAILED;
}

export interface IChangeTubAction {
  readonly type: typeof CHANGE_TUB;
  readonly currentTab: TTabCurrent;
}

export type TBurgerIngredientsActions =
  | IGetBurgerIngredientRequestAction
  | IGetBurgerIngredientSuccessAction
  | IGetBurgerIngredientFailedAction;

export const getBurgerIngredientRequest =
  (): IGetBurgerIngredientRequestAction => ({
    type: GET_BURGER_INGREDIENTS_REQUEST,
  });

export const getBurgerIngredientFailed =
  (): IGetBurgerIngredientFailedAction => ({
    type: GET_BURGER_INGREDIENTS_FAILED,
  });

export const changeTub = (currentTab: TTabCurrent): IChangeTubAction => ({
  type: CHANGE_TUB,
  currentTab,
});

export const getBurgerIngredientSuccess = (
  burgerIngredients: TburgerIngredients[]
): IGetBurgerIngredientSuccessAction => ({
  type: GET_BURGER_INGREDIENTS_SUCCESS,
  burgerIngredients,
});

export const getBurgerIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getBurgerIngredientRequest());
    fetch(`${baseUrl}ingredients`)
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch(getBurgerIngredientSuccess(res.data));
        } else {
          dispatch(getBurgerIngredientFailed());
        }
      })
      .catch((err) => {
        dispatch(getBurgerIngredientFailed());
      });
  };
};
