import ingredientDetails from "./ingredientDetails.module.css";
import IngredientStructure from "./IngridientStructure/ingridientStructure.js";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../../utils/constants.js";

export default function IngredientDetails(ingredient) {
  return (
    <div className={ingredientDetails.main}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={ingredientDetails.ul + " mb-15"}>
        <IngredientStructure
          title="Калории,ккал"
          number={ingredient.calories}
        />
        <IngredientStructure title="Белки, г" number={ingredient.proteins} />
        <IngredientStructure title="Жиры, г" number={ingredient.fat} />
        <IngredientStructure
          title="Углеводы, г"
          number={ingredient.carbohydrates}
        />
      </ul>
    </div>
  );
}

IngredientDetails.PropType = {
  ingredient: menuItemPropTypes.isRequired,
};
