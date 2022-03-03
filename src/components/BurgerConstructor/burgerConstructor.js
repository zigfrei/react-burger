import burgerConstructor from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import SetAnOrder from "./SetAnOrder/setAnOrder.js";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../utils/constants.js";
import { BurgerFillContext } from "../../services/burgerContext.js";
import { useContext, useReducer, useEffect } from "react";

export default function BurgerConstructor() {
  const { state } = useContext(BurgerFillContext);
  const findBun = state.data.find((e) => e.type === "bun");
  return (
    <section className="ml-5 pt-25 pl-4 pr-4">
      <ul className={burgerConstructor.main}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${findBun.name} (верх)`}
          price={findBun.price}
          thumbnail={findBun.image}
        />
        <div className={`${burgerConstructor.fill} mt-4`}>
          {state.data.map((ingredient, index) => {
            if (ingredient.type !== "bun") {
              return (
                <li key={index} className={`${burgerConstructor.element} mb-4`}>
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              );
            }
          })}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${findBun.name} (низ)`}
          price={findBun.price}
          thumbnail={findBun.image}
        />
      </ul>
      <SetAnOrder />
    </section>
  );
}
