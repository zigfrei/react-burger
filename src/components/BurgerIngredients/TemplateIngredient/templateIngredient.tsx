import templateIngredient from "./templateIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "../../../services/hooks";
import { useMemo } from "react";
import { FC } from "react";
import {TburgerIngredients, TIngredient} from "../../../services/types/data";

  export const TemplateIngredient: FC<TburgerIngredients> = (ingredient)=> {
  const { _id: id, type } = ingredient;
  const { ingredients, burgerBun } = useSelector(
    (state) => state.burgerConstructor
  );
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { id, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const count = useMemo(() => {
    if (ingredient.type !== "bun") {
      return (ingredients.filter((item: { id: string; }) => item.id === ingredient._id).length)
    } else {
      return burgerBun === ingredient._id ? 2 : 0;
    }
  }, [burgerIngredients, ingredients, burgerBun]);


  const ingredientImage = <img src={ingredient.image} alt={ingredient.name} />;
  return (
    <>
      <div className={templateIngredient.main} style={{ opacity }} ref={dragRef}>
        {count > 0 && <Counter count={count} size="default" />}
        <div className={`mr-4 ml-4`}>{ingredientImage}</div>
        <div className={`mb-1 mt-1 ${templateIngredient.cost}`}>
          <p className="text text_type_digits-default mr-2">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={templateIngredient.name}>
          <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
      </div>
    </>
  );
}
