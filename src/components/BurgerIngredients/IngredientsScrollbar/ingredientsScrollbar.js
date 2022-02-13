import ingredientsScrollbar from "./ingredientsScrollbar.module.css";
import TemplateIngredient from "../TemplateIngredient/templateIngredient.js";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../../utils/constants.js";
import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngredientsScrollbar({ ingredientsData }) {
  const [current, setCurrent] = React.useState();
  const bun = [];
  const sauce = [];
  const filling = [];
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const fillingRef = React.useRef(null);
  const bunHandleClick = (e) => {
    setCurrent(e);
    bunRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  const sauceHandleClick = (e) => {
    setCurrent(e);
    sauceRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  const fillingHandleClick = (e) => {
    setCurrent(e);
    fillingRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  ingredientsData.forEach((ingredient) => {
    if (ingredient.type === "bun") {
      bun.push(ingredient);
    } else if (ingredient.type === "sauce") {
      sauce.push(ingredient);
    } else {
      filling.push(ingredient);
    }
  });
  return (
    <>
      <nav className={`${ingredientsScrollbar.main} mt-5`}>
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={(bunHandleClick)}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={(sauceHandleClick)}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={(fillingHandleClick)}
        >
          Начинки
        </Tab>
      </nav>
      <ul className={ingredientsScrollbar.scroll}>
        <h2 ref={bunRef} className="text text_type_main-medium mt-10 mb-6">
          Булки
        </h2>
        <div className={`${ingredientsScrollbar.element} pl-4`}>
          {bun.map((ingredient) => (
            <TemplateIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
        <h2 ref={sauceRef} className="text text_type_main-medium mt-10 mb-6">
          Соусы
        </h2>
        <div className={`${ingredientsScrollbar.element} pl-4`}>
          {sauce.map((ingredient) => (
            <TemplateIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
        <h2 ref={fillingRef} className="text text_type_main-medium mt-10 mb-6">
          Начинки
        </h2>
        <div className={`${ingredientsScrollbar.element} pl-4`}>
          {filling.map((ingredient) => (
            <TemplateIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
      </ul>
    </>
  );
}
IngredientsScrollbar.propTypes = {
  ingredientsData: PropTypes.arrayOf(menuItemPropTypes.isRequired),
};
