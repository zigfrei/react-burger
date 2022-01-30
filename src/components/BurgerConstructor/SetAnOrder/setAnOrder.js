import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import setAnOrder from "./setAnOrder.module.css";
import PropTypes from "prop-types";
import { Modal } from "../../Modal/modal.js";
import React from "react";
import OrderDetails from "../OrderDetails/orderDetails.js";

export default function SetAnOrder({ totalCost }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const handleOpen = () => {
    setIsVisible(true);
  };
  const handleClose = () => {
    setIsVisible(false);
  };
  const modal = (
    <Modal onClose={handleClose}>
      <OrderDetails />
    </Modal>
  );
  return (
    <>
      <div className={`mt-10 ${setAnOrder.main}`}>
        <div className={`mr-10 ${setAnOrder.cost}`}>
          <p className="text text_type_digits-medium mr-2">{totalCost} </p>
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
SetAnOrder.propTypes = {
  totalCost: PropTypes.number.isRequired,
};
