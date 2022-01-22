import templateIngredient from "./templateIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../../utils/constants.js";

export default function TemplateIngredient({ ingredient }) {
  const image = <img src={ingredient.image} alt={ingredient.name} />;
  return (
    <li className={templateIngredient.main}>
      <Counter count={1} size="default" />
      <div className={`mr-4 ml-4`}>{image}</div>
      <div className={`mb-1 mt-1 ${templateIngredient.cost}`}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={templateIngredient.name}>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>
    </li>
  );
}
TemplateIngredient.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
};
