import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
} from "../constants/index";
import { TOrderActions } from "../actions/order";

type TOrderState = {
  readonly order: string[] | null;
  readonly orderRequest: boolean;
  readonly orderFailed: boolean;
};

const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.order,
        orderFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        order: null,
      };
    }
    default:
      return state;
  }
};
