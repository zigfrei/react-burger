import IngredientsTab from "./IngredientsTab/ingredientsTab.js";
import IngredientsScrollbar from "./IngredientsScrollbar/ingredientsScrollbar.js";
import PropTypes from 'prop-types';

export default function BurgerIngredients({ data }) {
  return (
    <section className="mr-5">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <IngredientsTab />
      <IngredientsScrollbar ingredientsData={data} />
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired
}
