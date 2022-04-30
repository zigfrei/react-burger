import ingredientPage from "./ingredients.module.css";
import IngredientDetails from "../components/BurgerIngredients/IngredientDetails/ingredientDetails.js";
import {
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function IngredientPage() {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { id } = useParams();
  const ingredient = burgerIngredients.find((element) => element._id === id);

  return (
    <>
      {" "}
      {ingredient && (
        <div className={ingredientPage.middle}>
          <h2 className={ingredientPage.title + " text text_type_main-large"}>
            {"Детали ингредиента"}
          </h2>
          <IngredientDetails {...ingredient} />
        </div>
      )}
      {!ingredient && (
        <div className={ingredientPage.middle}>
          <p className={"text_type_main-medium"}>Такой ингредиент не найден!</p>
        </div>
      )}
    </>
  );
}
