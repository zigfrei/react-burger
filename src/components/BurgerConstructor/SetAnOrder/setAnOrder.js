import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import setAnOrder from "./setAnOrder.module.css";
import PropTypes from "prop-types";

export default function SetAnOrder({ totalCost }) {
  return (
    <div className={`mt-10 ${setAnOrder.main}`}>
      <div className={`mr-10 ${setAnOrder.cost}`}>
        <p className="text text_type_digits-medium mr-2">{totalCost} </p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  );
}
SetAnOrder.propTypes = {
  totalCost: PropTypes.number.isRequired,
};
