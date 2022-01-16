import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructor from "./constructor.module.css";

export default function Constructor(props) {
  return (
    <div className={`ml-5 mr-2 mt-4 mb-4 ${constructor.div}`}>
      <BurgerIcon className="" type="primary" />
      <p className="text text_type_main-default ml-2 mr-5">Конструктор</p>
    </div>
  );
}
