import {
  ADD_INGREDIENT,
  CHANGE_BURGER_BUN,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  CLEAR_INGREDIENTS,
} from "../constants";
import { TIngredient, TBurgerBun } from "../types/data";

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly id: string;
  readonly key: string;
}

export interface IChangeBurgerBunAction {
  readonly type: typeof CHANGE_BURGER_BUN;
  readonly id: string;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly key: string;
}

export interface ISortIngredientAction {
  readonly type: typeof SORT_INGREDIENT;
  readonly ingredients: TIngredient[];
}

export interface IClearIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export type TBurgerConstructorActions =
  | IAddIngredientAction
  | IChangeBurgerBunAction
  | IDeleteIngredientAction
  | ISortIngredientAction
  | IClearIngredientsAction;

export const addIngredient = (
  id: string,
  key: string
): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  id,
  key,
});

export const changeBurgerBun = (id: string): IChangeBurgerBunAction => ({
  type: CHANGE_BURGER_BUN,
  id,
});

export const deleteIngredient = (key: string): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  key,
});

export const sortIngredient = (
  ingredients: TIngredient[]
): ISortIngredientAction => ({
  type: SORT_INGREDIENT,
  ingredients,
});

export const clearIngredients = (): IClearIngredientsAction => ({
  type: CLEAR_INGREDIENTS,
});
