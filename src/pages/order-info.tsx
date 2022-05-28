import { useParams, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "../services/hooks";
import orderInfo from "./order-info.module.css";
import OrderFullCard from "../components/OrderFullCard/orderFullCard";
import {
  wsUserConnectionStart,
  wsConnectionStart,
  wsConnectionFinish,
} from "../services/actions/ws";
import { useEffect } from "react";
import {TUrlID} from "../services/types/data"

export function OrderInfo() {
  const { orders, ordersUser } = useSelector(
    (state) => state.ws
  );
  const { id } = useParams<TUrlID>();
  const dispatch = useDispatch();
  const match = useRouteMatch();


  useEffect(() => {
    if (match.path == `/feed/:id`) {
      dispatch(wsConnectionStart());
      return () => {
        dispatch(wsConnectionFinish());
      };
    } else {
      dispatch(wsUserConnectionStart());
      return () => {
        dispatch(wsConnectionFinish());
      };
    }
  }, []);


  const order =
    match.path == `/feed/:id`
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
