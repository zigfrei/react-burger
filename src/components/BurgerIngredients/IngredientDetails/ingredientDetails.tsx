import ingredientDetails from "./ingredientDetails.module.css";
import {IngredientStructure} from "./IngridientStructure/ingridientStructure";
import { TburgerIngredients } from "../../../services/types/data";
import { FC } from "react";

interface IModal {
  ingredient: TburgerIngredients;
}

export const IngredientDetails: FC<IModal> = (props) => {
  return (
    <div className={ingredientDetails.main}>
      <img src={props.ingredient.image_large} alt={props.ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">
        {props.ingredient.name}
      </p>
      <ul className={ingredientDetails.ul + " mb-15"}>
        <IngredientStructure
          title="Калории,ккал"
          number={props.ingredient.calories}
        />
        <IngredientStructure
          title="Белки, г"
          number={props.ingredient.proteins}
        />
        <IngredientStructure title="Жиры, г" number={props.ingredient.fat} />
        <IngredientStructure
          title="Углеводы, г"
          number={props.ingredient.carbohydrates}
        />
      </ul>
    </div>
  );
};
