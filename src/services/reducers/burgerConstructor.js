import {
  ADD_INGREDIENT,
  CHANGE_BURGER_BUN,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  CLEAR_INGREDIENTS,
} from "../actions/burgerConstructor";

const initialState = {
  ingredients: [],
  burgerBun: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
