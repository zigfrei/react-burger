import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useSelector } from "../services/hooks";
import { Modal } from "../components/Modal/modal";
import OrderFullCard from "../components/OrderFullCard/orderFullCard";
import { TUrlID } from "../services/types/data";

export function OrderInfoModal() {
  let location = useLocation();
  const { orders, ordersUser } = useSelector((state) => state.ws);
  const { id } = useParams<TUrlID>();
  const history = useHistory();
  const match = useRouteMatch();

  const order =
    match.path === "/feed/:id"
      ? orders.find((element) => element._id === id)
      : ordersUser.find((element) => element._id === id);

  const onClose = () => {
    history.goBack();
  };

  const modal = (
    <Modal onClose={onClose} title={""}>{order && <OrderFullCard {...order} />}</Modal>
  );
  return <>{order && modal}</>;
}
