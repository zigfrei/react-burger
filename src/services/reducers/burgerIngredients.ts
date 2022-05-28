import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
  CHANGE_TUB,
} from "../constants";
import { TburgerIngredients, TTabCurrent } from "../types/data";
import {
  TBurgerIngredientsActions,
  IChangeTubAction,
} from "../actions/burgerIngredients";

type TBurgerIngredientState = {
  readonly burgerIngredients: TburgerIngredients[];
  readonly burgerIngredientsRequest: boolean;
  readonly burgerIngredientsFailed: boolean;
  readonly currentTab: TTabCurrent;
};

const initialState: TBurgerIngredientState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,
  currentTab: "Булки",
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        burgerIngredientsRequest: true,
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        burgerIngredientsFailed: false,
        burgerIngredients: action.burgerIngredients,
        burgerIngredientsRequest: false,
      };
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        burgerIngredientsFailed: true,
        burgerIngredientsRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const changeTabReducer = (
  state = initialState,
  action: IChangeTubAction
) => {
  switch (action.type) {
    case CHANGE_TUB: {
      return {
        ...state,
        currentTab: action.currentTab,
      };
    }
    default:
      return state;
  }
};
