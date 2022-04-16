import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructor from "./constructor.module.css";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

export default function Constructor() {
  const history = useHistory();

  const toConstructor = useCallback(() => {
    history.replace({ pathname: "/" });
  }, [history]);

  return (
    <div className={`ml-5 mr-2 mt-4 mb-4 ${constructor.div}`} onClick={toConstructor}>
      <BurgerIcon className="" type="primary" />
      <p className="text text_type_main-default ml-2 mr-5">Конструктор</p>
    </div>
  );
}
