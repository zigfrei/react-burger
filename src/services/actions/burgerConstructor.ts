import {
  ADD_INGREDIENT,
  CHANGE_BURGER_BUN,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  CLEAR_INGREDIENTS,
} from "../constants";
import {TIngredient, TBurgerBun} from "../types/data"

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredients: ReadonlyArray<TIngredient>;
  readonly id: number;
  readonly key: number;
}
//  export interface IGetCountriesSuccessAction {
//     readonly type: typeof COUNTRIES_REQUEST_SUCCESS;
//     readonly countries: ReadonlyArray<TCountry>;
//   }
export interface IChangeBurgerBunAction {
  readonly type: typeof CHANGE_BURGER_BUN;
  readonly burgerBun: ReadonlyArray<TBurgerBun>;
  readonly id: number;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredients: ReadonlyArray<TIngredient>;
  readonly key: number;
}

export interface ISortIngredientAction {
  readonly type: typeof SORT_INGREDIENT;
  readonly ingredients: ReadonlyArray<TIngredient>;
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


  // export const getCountriesSuccessAction = (countries: ReadonlyArray<TCountry>): IGetCountriesSuccessAction => ({
  //   type: COUNTRIES_REQUEST_SUCCESS,
  //   countries
  // });

export const addIngredient = (ingredients:ReadonlyArray<TIngredient>, id:number, key:number): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  ingredients,
  id,
  key,
});

export const changeBurgerBun = (burgerBun:ReadonlyArray<TBurgerBun>, id:number): IChangeBurgerBunAction => ({
  type: CHANGE_BURGER_BUN,
  burgerBun,
  id,
});

export const deleteIngredient = (ingredients:ReadonlyArray<TIngredient>, key:number): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  ingredients,
  key,
});

export const sortIngredient = (ingredients:ReadonlyArray<TIngredient>): ISortIngredientAction => ({
  type: SORT_INGREDIENT,
  ingredients,
});

export const clearIngredients = (): IClearIngredientsAction => ({
  type: CLEAR_INGREDIENTS,
});

// export const ADD_INGREDIENT = "ADD_INGREDIENT";
// export const CHANGE_BURGER_BUN = "CHANGE_BURGER_BUN";
// export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
// export const SORT_INGREDIENT = "SORT_INGREDIENT";
// export const CLEAR_INGREDIENTS = "CLEAR_INGREDIENTS";
