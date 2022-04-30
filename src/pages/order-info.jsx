import { useParams, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import orderInfo from "./order-info.module.css";
import OrderFullCard from "../components/OrderFullCard/orderFullCard";
import {
  WS_CONNECTION_START_INIT,
  WS_CONNECTION_START,
  WS_CONNECTION_FINISH,
} from "../services/actions/ws";
import { useEffect } from "react";

export function OrderInfo() {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { orders, ordersUser, totalToday, total } = useSelector(
    (state) => state.ws
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    if (match.path === "/feed/:id") {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_FINISH });
      };
    } else {
      dispatch({ type: WS_CONNECTION_START_INIT });
      return () => {
        dispatch({ type: WS_CONNECTION_FINISH });
      };
    }
  }, []);

  const order =
    match.path === "/feed/:id"
      ? orders.find((element) => element._id === id)
      : ordersUser.find((element) => element._id === id);

  return (
    <>
      {" "}
      {order && (
        <div className={orderInfo.middle}>
          <h2
            className={orderInfo.title + " text text_type_digits-default mb-10"}
          >
            #{order.number}
          </h2>
          <OrderFullCard {...order} />
        </div>
      )}
      {!order && (
        <div className={orderInfo.middle}>
          <p className={"text_type_main-medium"}>Такой заказ не найден!</p>
        </div>
      )}
    </>
  );
}
