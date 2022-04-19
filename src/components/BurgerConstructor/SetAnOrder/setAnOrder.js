import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import setAnOrder from "./setAnOrder.module.css";
import { Modal } from "../../Modal/modal.js";
import React, { useMemo } from "react";
import OrderDetails from "../OrderDetails/orderDetails.js";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../services/actions/order";
import { CLEAR_INGREDIENTS } from "../../../services/actions/burgerConstructor";
import { CLEAR_ORDER } from "../../../services/actions/order";
import { useLocation, Link, Redirect } from "react-router-dom";
import { getCookie } from "../../../utils/cookie";

export default function SetAnOrder() {
  let location = useLocation();
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { ingredients, burgerBun } = useSelector(
    (state) => state.burgerConstructor
  );
  // const [isVisible, setIsVisible] = React.useState(false);

  const totalCost = useMemo(() => {
    let total = 0;
    const element = burgerIngredients.find((el) => el._id === burgerBun);
    if (element) {
      total += element.price * 2;
    }
    ingredients.forEach((item) => {
      const element = burgerIngredients.find((el) => el._id === item.id);
      if (element) {
        total += element.price;
      }
    });
    return total;
  }, [ingredients, burgerIngredients, burgerBun]);

  const dispatch = useDispatch();

  // const handleOpen = () => {
  //   // setIsVisible(true);

  //   const burgerOrder = ingredients
  //     .map((item) => item.id)
  //     .concat(burgerBun, burgerBun);
  //   dispatch(getOrder(burgerOrder));
  // };
  // const handleClose = () => {
  //   setIsVisible(false);
  //   dispatch({
  //     type: CLEAR_INGREDIENTS,
  //   });
  //   dispatch({
  //     type: CLEAR_ORDER,
  //   });
  // };
  // const modal = (
  //   <Modal onClose={handleClose}>
  //     <OrderDetails />
  //   </Modal>
  // );
  return (
    <>
      <div className={`mt-10 ${setAnOrder.main}`}>
        <div className={`mr-10 ${setAnOrder.cost}`}>
          <p className="text text_type_digits-medium mr-2">{totalCost} </p>
          <CurrencyIcon type="primary" />
        </div>
        <Link
                className={setAnOrder.link}
                to={{
                  pathname: '/set-order',
                  state: { background: location },
                }}
              >
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
                </Link>
      </div>
      {/* {isVisible && modal} */}
    </>
  );
}
