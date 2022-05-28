import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import templateConstructorIngredientStyles from "./templateConstructorIngredient.module.css";
import { useDispatch } from "../../../services/hooks";
import { useDrag, useDrop } from "react-dnd";
import { deleteIngredient } from "../../../services/actions/burgerConstructor";
import { FC } from "react";
import { TburgerIngredients, TIngredient } from "../../../services/types/data";

interface ITemplateConstructorIngredient {
  ingredient: TburgerIngredients;
  ingredientKey: string;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

export const TemplateConstructorIngredient: FC<
  ITemplateConstructorIngredient
> = ({ ingredient, ingredientKey, index, moveIngredient }) => {
  const { image, price, name, type } = ingredient;
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const deleteIngredients = () => {
    dispatch(deleteIngredient(ingredientKey));
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
    hover: (item: ITemplateConstructorIngredient, monitor: any) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset()!;

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
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => deleteIngredients()}
      />
    </li>
  );
};
