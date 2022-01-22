import burgerConstructor from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import SetAnOrder from "./SetAnOrder/setAnOrder.js";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../utils/constants.js";

export default function BurgerConstructor({ data }) {
  const fill = [
    data[5],
    data[4],
    data[7],
    data[13],
    data[9],
    data[8],
    data[10],
  ];
  let totalCost = 5999;
  return (
    <section className="ml-5 pt-25 pl-4 pr-4">
      <ul className={burgerConstructor.main}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
        <div className={`${burgerConstructor.fill} mt-4`}>
          {fill.map((ingredient, index) => (
            <li key={index} className={`${burgerConstructor.element} mb-4`}>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${data[0].name} (низ)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </ul>
      <SetAnOrder totalCost={totalCost} />
    </section>
  );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired),
};
