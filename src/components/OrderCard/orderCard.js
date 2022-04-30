import orderCard from "./orderCard.module.css";
import { orderDate } from "../../utils/functions";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

export default function OrderCard({ order }) {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);

  const sortSameIngredients = {};
  order.ingredients.forEach((element) => {
    const ingredient = burgerIngredients.find(
      (el) => el._id === element
    );
    if (ingredient !== undefined) {
      element in sortSameIngredients ?
      sortSameIngredients[element].count += 1 :
      sortSameIngredients[element] = {
        ingredient: ingredient,
        count: 1,
      };
    }
  });
  const sortSameIngredientsArray = Object.values(sortSameIngredients);

  const total = useMemo(() => {
    return sortSameIngredientsArray.reduce((acc, item) => acc + (item.ingredient.price)*item.count, 0);
  }, [order.ingredients]);

  const ingredientsIcons = sortSameIngredientsArray.map((item) => {
    return (
      <li key={item.ingredient._id} className={orderCard.ingredient}>
        <img src={item.ingredient.image_mobile} className={orderCard.image} />
        <span className={"text text_type_digits-default " + orderCard.span}>
          {`+${sortSameIngredientsArray.length - 5}`}
        </span>
      </li>
    );
  });

  const orderDataTime = new Date(order.createdAt);

  return (
    <div className="mb-4">
      <li className={orderCard.main}>
        <div className={orderCard.id + " mb-6"}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {orderDate(orderDataTime)}
          </p>
        </div>
        <p className="text text_type_main-medium mb-6">{order.name}</p>
        <div className={orderCard.structure}>
          <ul className={orderCard.ingredients}>{ingredientsIcons}</ul>
          <div className={orderCard.cost}>
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

