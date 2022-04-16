import ingredientsScrollbar from "./ingredientsScrollbar.module.css";
import TemplateIngredient from "../TemplateIngredient/templateIngredient.js";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../../utils/constants.js";
import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TUB } from "../../../services/actions/burgerIngredients";
import { useLocation, Link } from "react-router-dom";

export default function IngredientsScrollbar({ ingredientsData }) {
  let location = useLocation();

  const { currentTab } = useSelector((state) => state.tab);
  const dispatch = useDispatch();

  const bun = [];
  const sauce = [];
  const filling = [];

  const bunRef = React.useRef("bun");
  const sauceRef = React.useRef("sauce");
  const fillingRef = React.useRef("fill");

  const scroll = (item) => {
    item.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollEvent = (e) => {
    const elementHeight = e.target.scrollTop;
    const bunHeight = bunRef.current.scrollHeight;
    const sauceHeight = sauceRef.current.scrollHeight;
    const fillingHeight = fillingRef.current.scrollHeight;

    if (bunHeight - elementHeight > 0) {
      dispatch({
        type: CHANGE_TUB,
        currentTab: "Булки",
      });
    } else if (bunHeight + sauceHeight - elementHeight > 0) {
      dispatch({
        type: CHANGE_TUB,
        currentTab: "Соусы",
      });
    } else if (bunHeight + sauceHeight + fillingHeight - elementHeight > 0) {
      dispatch({
        type: CHANGE_TUB,
        currentTab: "Начинки",
      });
    }
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
          active={currentTab === "Булки"}
          onClick={() => scroll(bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={currentTab === "Соусы"}
          onClick={() => scroll(sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={currentTab === "Начинки"}
          onClick={() => scroll(fillingRef)}
        >
          Начинки
        </Tab>
      </nav>
      <ul className={ingredientsScrollbar.scroll} onScroll={scrollEvent}>
        <div ref={bunRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <div className={`${ingredientsScrollbar.element} pl-4`}>
            {bun.map((ingredient) => (
              <Link
                style={{ all: "unset" }}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}
              >
                <TemplateIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                />
              </Link>
            ))}
          </div>
        </div>
        <div ref={sauceRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <div className={`${ingredientsScrollbar.element} pl-4`}>
            {sauce.map((ingredient) => (
              <Link
                style={{ all: "unset" }}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}
              >
                <TemplateIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                />
              </Link>
            ))}
          </div>
        </div>
        <div ref={fillingRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <div className={`${ingredientsScrollbar.element} pl-4`}>
            {filling.map((ingredient) => (
              <Link
                style={{ all: "unset" }}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}
              >
                <TemplateIngredient
                  key={ingredient._id}
                  ingredient={ingredient}
                />
              </Link>
            ))}
          </div>
        </div>
      </ul>
    </>
  );
}
IngredientsScrollbar.propTypes = {
  ingredientsData: PropTypes.arrayOf(menuItemPropTypes.isRequired),
};
