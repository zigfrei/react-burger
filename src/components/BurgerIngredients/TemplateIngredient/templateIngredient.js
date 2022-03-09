import templateIngredient from "./templateIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../../utils/constants.js";
import React from "react";
import { Modal } from "../../Modal/modal.js";
import IngredientDetails from "../IngredientDetails/ingredientDetails.js";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../services/actions/modal";
import { useMemo } from "react";

export default function TemplateIngredient({ ingredient }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useDispatch();

  const { image, price, name, __v, _id: id, type } = ingredient;
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

  const handleOpen = () => {
    setIsVisible(true);
    dispatch({
      type: OPEN_MODAL,
      card: ingredient,
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  const count = useMemo(() => {
    if (ingredient.type !== "bun") {
      return ingredients.filter((item) => item.id === ingredient._id).length;
    } else {
      return burgerBun === ingredient._id ? 2 : 0;
    }
  }, [burgerIngredients, ingredients, burgerBun]);

  const modal = (
    <Modal onClose={handleClose} title="Детали ингредиента">
      <IngredientDetails {...ingredient} />
    </Modal>
  );

  const ingredientImage = <img src={ingredient.image} alt={ingredient.name} />;
  return (
    <>
      <li
        className={templateIngredient.main}
        style={{ opacity }}
        onClick={handleOpen}
        ref={dragRef}
      >
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
      </li>
      {isVisible && modal}
    </>
  );
}
TemplateIngredient.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
};
