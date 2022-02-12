import orderDetails from "./orderDetails.module.css";
import done from "../../../images/done.png";
import { BurgerFillContext } from "../../../utils/burgerContext.js";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function OrderDetails({orderNumber}) {
  const { state } = useContext(BurgerFillContext);

  return (
    <>
      <p
        className={
          "text text_type_digits-large mt-4 mb-8 " + orderDetails.number
        }
      >
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className="mb-15" src={done} alt="order accepted" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};
