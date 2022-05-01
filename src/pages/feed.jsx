import { useSelector, useDispatch } from "react-redux";
import { socketFeed } from "../utils/constants";
import feed from "./feed.module.css";
import { useLocation, Link } from "react-router-dom";
import OrderCard from "../components/OrderCard/orderCard.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  wsConnectionStart,
  wsConnectionFinish,
} from "../services/actions/ws";

export const OrderFeed = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { orders, totalToday, total } = useSelector((state) => state.ws);

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionFinish());
    };
  }, []);

  const doneOrders = orders.map((order) => {
    if (order.status == "done") {
      return (
        <li className={feed.li} key={order._id}>
          <p className={feed.doneNum + " text text_type_digits-default"}>
            {order.number}
          </p>
        </li>
      );
    }
  });

  const doingOrders = orders.map((order) => {
    if (order.status !== "done") {
      return (
        <li className={feed.li} key={order._id}>
          <p className="text text_type_digits-default">{order.number}</p>
        </li>
      );
    }
  });

  // const cancelOrders = socketFeed.orders.map((order) => {
  //   if (order.status !== "done") {
  //     return (
  //       <li className={feed.li}>
  //         <p className="text text_type_digits-default">
  //           {order.number}
  //         </p>
  //       </li>
  //     );
  //   }
  // });

  return (
    <section className="mr-5">
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feed.main}>
        {" "}
        <ul className={feed.scroll}>
          {orders.map((order) => (
            <Link
              className={feed.link}
              key={order._id}
              to={{
                pathname: `/feed/${order._id}`,
                state: { background: location },
              }}
            >
              <OrderCard order={order} />
            </Link>
          ))}
        </ul>
        <div className="ml-15">
          <div className={feed.statsHeader}>
            <div className="mb-15">
              <p className="text text_type_main-medium mb-6 mr-9">Готовы: </p>
              <ul className={feed.statDone}>{doneOrders}</ul>
            </div>
            <div>
              <p className="text text_type_main-medium mb-6">В работе: </p>
              <ul className={feed.statDone}>{doingOrders}</ul>
            </div>
          </div>
          <div className="mb-15">
            <p className="text text_type_main-medium">
              Выполнено за все время:{" "}
            </p>
            <p className={feed.bigNum + " text text_type_digits-large"}>
              {total}
            </p>
          </div>
          <div className="mb-15">
            <p className="text text_type_main-medium">Выполнено за сегодня: </p>
            <p className={feed.bigNum + " text text_type_digits-large"}>
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
