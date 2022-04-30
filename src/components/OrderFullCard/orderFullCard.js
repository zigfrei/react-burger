import orderFullCard from "./orderFullCard.module.css";
import { orderDate } from "../../utils/functions";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

export default function OrderFullCard(order) {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);

  const sortSameIngredients = {};
  order.ingredients.forEach((element) => {
    const ingredient = burgerIngredients.find((el) => el._id === element);
    if (ingredient !== undefined) {
      element in sortSameIngredients
        ? (sortSameIngredients[element].count += 1)
        : (sortSameIngredients[element] = {
            ingredient: ingredient,
            count: 1,
          });
    }
  });
  const sortSameIngredientsArray = Object.values(sortSameIngredients);

  const total = useMemo(() => {
    return sortSameIngredientsArray.reduce(
      (acc, item) => acc + item.ingredient.price * item.count,
      0
    );
  }, [order.ingredients]);

  const ingredientBlock = sortSameIngredientsArray.map((item) => {
    return (
      <li key={item.ingredient._id} className={orderFullCard.ingredient}>
        <div className={orderFullCard.name}>
          <div className={orderFullCard.border}>
            {" "}
            <img
              src={item.ingredient.image_mobile}
              className={orderFullCard.image}
            />
          </div>
          <p className="text text_type_main-small ml-4 mr-4">
            {item.ingredient.name}
          </p>
        </div>

        <div className={orderFullCard.cost}>
          <p className="text text_type_digits-default mr-2">
            {item.count} x {item.ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </li>
    );
  });

  const statusOrder = (order) => {
    if (order.status == "done") {
      return (
        <p
          className={
            orderFullCard.status + " text text_type_main-default mb-15"
          }
        >
          Выполнен
        </p>
      );
    } else {
      <p className={"text text_type_main-default mb-15"}>Готовится</p>;
    }
  };

  const orderDataTime = new Date(order.createdAt);

  return (
    <div className="mb-4">
      <li className={orderFullCard.main}>
        <p className="text text_type_main-medium mb-3">{order.name}</p>
        {statusOrder(order)}
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={orderFullCard.scroll + " mb-10 "}>{ingredientBlock}</ul>

        <div className={orderFullCard.structure}>
          <p className="text text_type_main-default text_color_inactive">
            {orderDate(orderDataTime)}
          </p>
          <div className={orderFullCard.cost}>
            <p className="text text_type_digits-default mr-1">{total}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </div>
  );
}
// TemplateIngredient.propTypes = {
//   ingredient: menuItemPropTypes.isRequired,
// };
