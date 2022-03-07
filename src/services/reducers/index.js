import { combineReducers } from "redux";
import {
  burgerIngredientsReducer,
  changeTabReducer,
} from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order: orderReducer,
  tab: changeTabReducer,
});
