import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_FINISH,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_INIT
} from '../actions/ws';

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  ordersUser: [],
  totalUser: 0,
  error: undefined,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
        orders: [],
        total: 0,
        totalToday: 0,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
        orders: [],
        ordersUser: [],
        total: 0,
        totalToday: 0,
      };
    }
    case WS_CONNECTION_FINISH: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
        orders: [],
        ordersUser: [],
        total: 0,
        totalToday: 0,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined,
      };
    }
    case WS_GET_MESSAGE_INIT: {
      return {
        ...state,
        ordersUser: action.payload.orders,
        totalUser: action.payload.total,
        totalTodayUser: action.payload.totalToday,
        error: undefined,
      };
    }
    default:
      return state;
  }
};
