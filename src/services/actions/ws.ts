import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_INIT,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_FINISH,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_INIT,
} from "../constants";
import { TOrder } from "../types/data";

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionStartInitAction {
  readonly type: typeof WS_CONNECTION_START_INIT;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionFinishAction {
  readonly type: typeof WS_CONNECTION_FINISH;
}
export interface IPayload {
  readonly orders: TOrder[];
  readonly total: number;
  readonly totalToday: number;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IPayload;
}
export interface IWsGetMessageInitAction {
  readonly type: typeof WS_GET_MESSAGE_INIT;
  readonly payload: IPayload;
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionStartInitAction
  | IWsConnectionSuccessAction
  | IWsGetMessageInitAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsConnectionFinishAction
  | IWsGetMessageAction;

export const wsConnectionStart = (): IWsConnectionStartAction => ({
  type: WS_CONNECTION_START,
});

export const wsUserConnectionStart = (): IWsConnectionStartInitAction => ({
  type: WS_CONNECTION_START_INIT,
});

export const wsConnectionFinish = (): IWsConnectionFinishAction => ({
  type: WS_CONNECTION_FINISH,
});

export const wsGetMessage = (payload: IPayload): IWsGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload,
});
export const wsUserGetMessage = (
  payload: IPayload
): IWsGetMessageInitAction => ({
  type: WS_GET_MESSAGE_INIT,
  payload,
});
