import ingredientStructure from "./ingridientStructure.module.css";
import PropTypes from "prop-types";

export default function IngredientStructure(props) {
  return (
    <li className={ingredientStructure.main}>
      <p className="text text_type_main-default text_color_inactive ">
        {props.title}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {props.number}
      </p>
    </li>
  );
}

IngredientStructure.PropType = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
