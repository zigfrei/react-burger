import { combineReducers } from "redux";
import {
  burgerIngredientsReducer,
  changeTabReducer,
} from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { passwordResetReducer } from "./forgot-password";
import { newPasswordReducer } from "./reset-password";
import {authReducer} from './auth';
import {wsReducer} from './wsReducer';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  modal: modalReducer,
  order: orderReducer,
  tab: changeTabReducer,
  passwordReset: passwordResetReducer,
  newPassword: newPasswordReducer,
  auth: authReducer,
  ws: wsReducer,
});
