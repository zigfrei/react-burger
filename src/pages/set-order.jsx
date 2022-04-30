import OrderDetails from "../components/BurgerConstructor/OrderDetails/orderDetails";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useMemo } from "react";
import { Modal } from "../components/Modal/modal";
import { getOrder, getOrderToken } from "../services/actions/order";
import { CLEAR_INGREDIENTS } from "../services/actions/burgerConstructor";
import { CLEAR_ORDER } from "../services/actions/order";
import { isTokenExpired, getCookie } from "../utils/cookie";

export function SetOrderModal() {
  const dispatch = useDispatch();
  const { ingredients, burgerBun } = useSelector(
    (state) => state.burgerConstructor
  );

  const history = useHistory();


  const sendOrder = useMemo(() => {
    const burgerOrder = ingredients
      .map((item) => item.id)
      .concat(burgerBun, burgerBun);
      console.log(isTokenExpired(getCookie("token")));
    if (isTokenExpired(getCookie("token"))) {
      dispatch(getOrderToken(burgerOrder));
    } else {
      dispatch(getOrder(burgerOrder));
    }
  }, []);

  const handleClose = () => {
    dispatch({
      type: CLEAR_INGREDIENTS,
    });
    dispatch({
      type: CLEAR_ORDER,
    });
    history.goBack();
  };

  return (
    <>
      <Modal onClose={handleClose}>
        <OrderDetails />
      </Modal>
    </>
  );
}
