import AppHeader from "../AppHeader/appHeader.js";
import { BurgerIngredients } from "../BurgerIngredients/burgerIngredients.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor.js";
import app from "./app.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={app.page}>
      <header>
        <AppHeader />
      </header>
      <main className={app.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}
