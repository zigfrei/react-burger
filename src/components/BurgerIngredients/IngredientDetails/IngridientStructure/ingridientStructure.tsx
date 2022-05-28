import ingredientStructure from "./ingridientStructure.module.css";
import { FC } from "react";

interface IIngredientStructure {
  title: string;
  number: number;
}

export const IngredientStructure: FC<IIngredientStructure> = ({
  title,
  number,
}) => {
  return (
    <li className={ingredientStructure.main}>
      <p className="text text_type_main-default text_color_inactive ">
        {title}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {number}
      </p>
    </li>
  );
};
