import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../components/Modal/modal";
import OrderFullCard from "../components/OrderFullCard/orderFullCard";
import {
  WS_CONNECTION_START_INIT,
  WS_CONNECTION_START,
  WS_CONNECTION_FINISH,
} from "../services/actions/ws";
import React, { useEffect } from "react";

export function OrderInfoModal() {
  let location = useLocation();
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { orders, ordersUser, totalToday, total } = useSelector(
    (state) => state.ws
  );
  const { id } = useParams();
  const history = useHistory();
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

  const onClose = () => {
    history.goBack();
    history.replace({ pathname: location.pathname, state: undefined });
  };
  // useEffect(() => {
  //   history.replace({ pathname: location.pathname, state: undefined })
  // }, [])

  const modal = (
    <Modal onClose={onClose} number={"#" + order.number}>
      <OrderFullCard {...order} />
    </Modal>
  );
  return <>{order && modal}</>;
}
