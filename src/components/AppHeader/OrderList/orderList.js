import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderList(props) {
  return (
    <div className="mr-2">
      <ListIcon className="ml-5 mr-2" type="secondary" />
      <p className="text text_type_main-default mr-5">Лента заказов</p>
    </div>
  );
}
