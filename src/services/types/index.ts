import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import {
  TBurgerIngredientsActions,
  IChangeTubAction,
} from "../actions/burgerIngredients";
import { TAuthActions } from "../actions/auth";
import { TOrderActions } from "../actions/order";
import { TResetPasswordActions } from "../actions/reset-password";
import { TForgotPasswordActions } from "../actions/forgot-password";
import { TWsActions } from "../actions/ws";

type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | IChangeTubAction
  | TAuthActions
  | TOrderActions
  | TResetPasswordActions
  | TForgotPasswordActions
  | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
