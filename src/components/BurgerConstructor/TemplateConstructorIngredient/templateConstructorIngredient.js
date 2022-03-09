import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import templateConstructorIngredientStyles from "./templateConstructorIngredient.module.css";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { DELETE_INGREDIENT } from "../../../services/actions/burgerConstructor";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../../utils/constants";

export const TemplateConstructorIngredient = ({
  ingredient,
  ingredientKey,
  index,
  moveIngredient,
}) => {
  const { image, price, name, type } = ingredient;
  const dispatch = useDispatch();
  const ref = useRef(null);

  const deleteIngredient = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      key: ingredientKey,
    });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "item",
    item: { ingredient, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.1 : 1,
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
    },
  });

  dragRef(dropRef(ref));

  return (
    <li
      className={"mb-4 " + templateConstructorIngredientStyles.element}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => deleteIngredient()}
        style={{ opacity }}
      />
    </li>
  );
};

TemplateConstructorIngredient.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
  ingredientKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
};
