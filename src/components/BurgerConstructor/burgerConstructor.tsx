import burgerConstructor from "./burgerConstructor.module.css";
import {
  addIngredient,
  changeBurgerBun,
  sortIngredient,
} from "../../services/actions/burgerConstructor";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ArrowDownIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import SetAnOrder from "./SetAnOrder/setAnOrder";
import { useDispatch, useSelector } from "../../services/hooks";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { TemplateConstructorIngredient } from "./TemplateConstructorIngredient/templateConstructorIngredient";
import { TType } from "../../services/types/data";
interface IIngredient {
  readonly type: TType;
  readonly id: string;
}

export default function BurgerConstructor() {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);

  const { ingredients, burgerBun } = useSelector(
    (state) => state.burgerConstructor
  );

  const dispatch = useDispatch();
  const findBun = burgerIngredients.filter((bun) => bun._id === burgerBun);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      if (item.type !== "bun") {
        dispatch(addIngredient(item.id, uuidv4()));
      } else {
        dispatch(changeBurgerBun(item.id));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const changedIngredient = ingredients.slice();
    changedIngredient.splice(dragIndex, 1);
    changedIngredient.splice(hoverIndex, 0, ingredients[dragIndex]);
    dispatch(sortIngredient(changedIngredient));
  };

  const border = isHover ? "2px solid #4C4CFF" : "transparent";

  const fillIngredients = ingredients.map((item, index) => {
    const addIngredient = burgerIngredients.find(
      (el) => el.type !== "bun" && el._id === item.id
    );
    return (
      addIngredient && (
        <TemplateConstructorIngredient
          ingredient={addIngredient}
          ingredientKey={item.key}
          index={index}
          moveIngredient={moveIngredient}
          key={item.key}
        />
      )
    );
  });
  return (
    <section
      style={{ border }}
      className={"ml-5 pt-25 pl-4 pr-4"}
      ref={dropTarget}
    >
      {findBun.length === 0 && fillIngredients.length === 0 && (
        <div className={burgerConstructor.noIngredient}>
          <p className="text text_type_main-default text_color_inactive">
            Собирите свой бургер сами. Перетяните понравившиеся ингредиенты в
            конструктор бургера. Начните с хрустящей булочки.{" "}
          </p>{" "}
          <ArrowDownIcon type="primary" />
        </div>
      )}
      <ul className={burgerConstructor.main}>
        <li className={`${burgerConstructor.list} mb-4 mr-2`}>
          {findBun.map((item) => (
            <ConstructorElement
              key={item._id}
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
            />
          ))}
        </li>
        <div className={`${burgerConstructor.fill} mt-4`}>
          {fillIngredients}
        </div>
        <li className={`${burgerConstructor.list} mb-4 mr-2`}>
          {findBun.map((item) => (
            <ConstructorElement
              key={item._id}
              type="bottom"
              isLocked={true}
              text={`${item.name} (низ)`}
              price={item.price}
              thumbnail={item.image}
            />
          ))}
        </li>
      </ul>
      {(findBun.length !== 0 || fillIngredients.length !== 0) && <SetAnOrder />}
    </section>
  );
}
