import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from './services/middleware/socketMiddleware';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_FINISH,
  WS_CONNECTION_START,
  WS_CONNECTION_START_INIT,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_INIT,
} from './services/actions/ws';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
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

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
