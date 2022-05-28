import OrderDetails from "../components/BurgerConstructor/OrderDetails/orderDetails";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../services/hooks"
import { Modal } from "../components/Modal/modal";
import { clearIngredients } from "../services/actions/burgerConstructor";
import { clearOrder } from "../services/actions/order";

export function SetOrderModal() {
  const dispatch = useDispatch();

  const history = useHistory<History>();

  const handleClose = () => {
    dispatch(clearIngredients());
    dispatch(clearOrder());
    history.goBack();
  };

  return (
    <>
      <Modal onClose={handleClose} title={""}>
        <OrderDetails />
      </Modal>
    </>
  );
}
