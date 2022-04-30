import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderlist from "./orderList.module.css";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";


export default function OrderList(props) {
  const history = useHistory();

  const toOrderList = useCallback(() => {
    history.replace({ pathname: "/feed" });
  }, [history]);

  return (
    <div className={`ml-5 mr-2 mt-4 mb-4 ${orderlist.div}`} onClick={toOrderList}>
      <ListIcon className="" type="secondary" />
      <p className={`text text_type_main-default ml-2 mr-5 ${orderlist.p}`}>
        Лента заказов
      </p>
    </div>
  );
}
