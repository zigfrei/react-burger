import ingredientsScrollbar from "./ingredientsScrollbar.module.css";
import { TemplateIngredient } from "../TemplateIngredient/templateIngredient";
import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../../services/hooks";
import { changeTub } from "../../../services/actions/burgerIngredients";
import { useLocation, Link } from "react-router-dom";
import { useRef, MutableRefObject } from "react";
import { TburgerIngredients } from "../../../services/types/data";

export default function IngredientsScrollbar() {
  let location = useLocation();
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { currentTab } = useSelector((state) => state.tab);
  const dispatch = useDispatch();

  const bun: TburgerIngredients[] = [];
  const sauce: TburgerIngredients[] = [];
  const filling: TburgerIngredients[] = [];

  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const fillingRef = useRef<HTMLLIElement>(null);

  const scroll = (item: MutableRefObject<HTMLLIElement | null>) => {
    item.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollEvent = (e: React.UIEvent<HTMLElement>): void => {
    const elementHeight = e.currentTarget.scrollTop;
    if (bunRef.current && sauceRef.current && fillingRef.current) {
      const bunHeight = bunRef.current.scrollHeight;
      const sauceHeight = sauceRef.current.scrollHeight;
      const fillingHeight = fillingRef.current.scrollHeight;

      if (bunHeight - elementHeight > 0) {
        dispatch(changeTub("Булки"));
      } else if (bunHeight + sauceHeight - elementHeight > 0) {
        dispatch(changeTub("Соусы"));
      } else if (bunHeight + sauceHeight + fillingHeight - elementHeight > 0) {
        dispatch(changeTub("Начинки"));
      }
    }
  };

  burgerIngredients.forEach((ingredient) => {
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
        <li ref={bunRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <div className={`${ingredientsScrollbar.element} pl-4`}>
            {bun.map((ingredient) => (
              <Link
                className={ingredientsScrollbar.link}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}
              >
                <TemplateIngredient key={ingredient._id} {...ingredient} />
              </Link>
            ))}
          </div>
        </li>
        <li ref={sauceRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <div className={`${ingredientsScrollbar.element} pl-4`}>
            {sauce.map((ingredient) => (
              <Link
                className={ingredientsScrollbar.link}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}
              >
                <TemplateIngredient key={ingredient._id} {...ingredient} />
              </Link>
            ))}
          </div>
        </li>
        <li ref={fillingRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <div className={`${ingredientsScrollbar.element} pl-4`}>
            {filling.map((ingredient) => (
              <Link
                className={ingredientsScrollbar.link}
                key={ingredient._id}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location },
                }}
              >
                <TemplateIngredient key={ingredient._id} {...ingredient} />
              </Link>
            ))}
          </div>
        </li>
      </ul>
    </>
  );
}
