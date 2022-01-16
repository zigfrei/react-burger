import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ingredientsTab from "./ingredientsTab.module.css";

export default function IngredientsTab(props) {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <div className={`${ingredientsTab.main} mt-5`}>
      <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}
