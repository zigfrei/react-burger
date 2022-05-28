import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from './middleware/socketMiddleware';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_FINISH,
  WS_CONNECTION_START,
  WS_CONNECTION_START_INIT,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_INIT,
} from './constants';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

export interface IWsStoreActions {
  readonly ws: typeof WS_CONNECTION_START;
  readonly wsInit: typeof WS_CONNECTION_START_INIT;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_MESSAGE;
  readonly onMessageInit: typeof WS_GET_MESSAGE_INIT;
  readonly wsClose: typeof WS_CONNECTION_FINISH;
}

export const wsActions: IWsStoreActions  = {
  ws: WS_CONNECTION_START,
  wsInit: WS_CONNECTION_START_INIT,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  onMessageInit: WS_GET_MESSAGE_INIT,
  wsClose: WS_CONNECTION_FINISH
};

declare const window: any;
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers( applyMiddleware (thunk, socketMiddleware(wsUrl, wsActions)));

export const store = createStore(rootReducer, enhancer);
