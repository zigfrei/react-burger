import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import setAnOrder from "./setAnOrder.module.css";
import PropTypes from "prop-types";
import { Modal } from "../../Modal/modal.js";
import React, { useEffect, useState } from "react";
import OrderDetails from "../OrderDetails/orderDetails.js";
import { BurgerFillContext } from "../../../utils/burgerContext.js";
import { useContext, useReducer } from "react";
import { postUrl } from "../../../utils/constants.js";

function reducer(sumState, data) {
  let sum = data.reduce(
    (sum, ingredients) =>
      sum +
      (ingredients.type === "bun" ? ingredients.price * 2 : ingredients.price),
    0
  );
  return sum;
}
export default function SetAnOrder() {
  const { state } = useContext(BurgerFillContext);
  const { data } = state;
  const [isVisible, setIsVisible] = React.useState(false);
  const [ssstate, dispatch] = useReducer(reducer, 0);

  const [orderNumber, setOrderNumber] = useState(0);
  useEffect(() => {
    dispatch(data);
  }, [data]);

  const ingridientId = data.map((ing) => ing._id);
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingridientId,
    }),
  };
  const postOrder = async () => {
    try {
      const res = await fetch(postUrl, requestOptions);
      if (!res.ok) {
        throw new Error("Ответ сети был не ok.");
      } else {
        const resData = await res.json();
        setOrderNumber(resData.order.number);
      }
    } catch (error) {
      console.log("Возникла проблема с вашим fetch запросом: ", error);
    }
  };

  const handleOpen = () => {
    setIsVisible(true);
    postOrder();
  };
  const handleClose = () => {
    setIsVisible(false);
  };
  const modal = (
    <Modal onClose={handleClose}>
      <OrderDetails orderNumber={orderNumber} />
    </Modal>
  );
  return (
    <>
      <div className={`mt-10 ${setAnOrder.main}`}>
        <div className={`mr-10 ${setAnOrder.cost}`}>
          <p className="text text_type_digits-medium mr-2">{ssstate} </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOpen}>
          Оформить заказ
        </Button>
      </div>
      {isVisible && modal}
    </>
  );
}

