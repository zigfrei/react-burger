import {
  getCookie,
} from "../../utils/cookie";
import {IWsStoreActions} from "../store";
import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsUrl:string, wsActions:IWsStoreActions):Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket|null = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { ws, wsInit, onOpen, onClose, onError, onMessage, onMessageInit , wsClose } = wsActions;
      const token  = getCookie("token");

      if (type === ws) {
        socket = new WebSocket(`${wsUrl}/all`);
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
      }

      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessageInit, payload: restParsedData });
        };

      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsClose) {
          socket.close(1000, 'Закрытие сокета')
        }
      }

      next(action);
    };
  };
};
