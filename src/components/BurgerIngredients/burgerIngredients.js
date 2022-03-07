import IngredientsScrollbar from "./IngredientsScrollbar/ingredientsScrollbar.js";
import { useSelector } from "react-redux";

export const BurgerIngredients = () => {
  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed,
  } = useSelector((state) => state.burgerIngredients);

  if (burgerIngredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (burgerIngredientsRequest) {
    return <p>Загрузка...</p>;
  } else {
    return (
      <section className="mr-5">
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <IngredientsScrollbar ingredientsData={burgerIngredients} />
      </section>
    );
  }
};
