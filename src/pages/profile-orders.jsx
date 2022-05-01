import { useSelector, useDispatch } from "react-redux";
import ordersProfile from "./profile-orders.module.css";
import { useLocation, Link } from "react-router-dom";
import OrderCard from "../components/OrderCard/orderCard.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  wsUserConnectionStart,
  wsConnectionFinish,
} from "../services/actions/ws";

export const OrdersProfile = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { ordersUser, totalToday, total } = useSelector((state) => state.ws);

  useEffect(() => {
    dispatch(wsUserConnectionStart());
    return () => {
      dispatch(wsConnectionFinish());
    };
  }, []);

  return (
    <section className="formWrapper">
      <div className="formMainOrder">
        {" "}
        <ul className={ordersProfile.scroll}>
          {[...ordersUser].reverse().map((order) => (
            <Link
              className={ordersProfile.link}
              key={order._id}
              to={{
                pathname: `/profile/orders/${order._id}`,
                state: { background: location },
              }}
            >
              <OrderCard order={order} />
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};
