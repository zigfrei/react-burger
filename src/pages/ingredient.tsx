import ingredientPage from "./ingredients.module.css";
import {IngredientDetails} from "../components/BurgerIngredients/IngredientDetails/ingredientDetails";
import {
  useParams,
} from "react-router-dom";
import {  useSelector } from "../services/hooks";
import {TUrlID} from "../services/types/data";

export function IngredientPage() {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { id } = useParams<TUrlID>();
  const ingredient = burgerIngredients.find((element) => element._id === id);

  return (
    <>
      {" "}
      {ingredient && (
        <div className={ingredientPage.middle}>
          <h2 className={ingredientPage.title + " text text_type_main-large"}>
            {"Детали ингредиента"}
          </h2>
          <IngredientDetails ingredient={ingredient} />
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
