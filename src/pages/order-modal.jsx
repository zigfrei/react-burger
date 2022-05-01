import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../components/Modal/modal";
import OrderFullCard from "../components/OrderFullCard/orderFullCard";
import React, { useEffect } from "react";

export function OrderInfoModal() {
  let location = useLocation();
  console.log(location);
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { orders, ordersUser, totalToday, total } = useSelector(
    (state) => state.ws
  );
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const order =
    match.path === "/feed/:id"
      ? orders.find((element) => element._id === id)
      : ordersUser.find((element) => element._id === id);

  const onClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.goBack();
  };


  const modal = (
    <Modal onClose={onClose} >
      <OrderFullCard {...order} />
    </Modal>
  );
  return <>{order && modal}</>;
}
