import {
  ADD_INGREDIENT,
  CHANGE_BURGER_BUN,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  CLEAR_INGREDIENTS,
} from "../constants";
import {TIngredient, TBurgerBun} from "../types/data"

import {TBurgerConstructorActions} from '../actions/burgerConstructor'

type TBurgerConstructorState = {
  ingredients: ReadonlyArray<TIngredient>;
  burgerBun: ReadonlyArray<TBurgerBun>;
}

const initialState: TBurgerConstructorState= {
  ingredients: [],
  burgerBun: [],
};

export const burgerConstructorReducer = (state = initialState, action:TBurgerConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.concat({
          id: action.id,
          key: action.key,
        }),
      };
    }

    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item) => item.key !== action.key
        ),
      };
    }

    case CHANGE_BURGER_BUN: {
      return {
        ...state,
        burgerBun: action.id,
      };
    }

    case SORT_INGREDIENT: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }

    case CLEAR_INGREDIENTS: {
      return {
        ingredients: [],
        burgerBun: [],
      };
    }

    default:
      return state;
  }
};
