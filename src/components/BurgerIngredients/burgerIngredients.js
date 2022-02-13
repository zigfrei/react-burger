import IngredientsScrollbar from "./IngredientsScrollbar/ingredientsScrollbar.js";
import PropTypes from "prop-types";
import { menuItemPropTypes } from "../../utils/constants.js";

export default function BurgerIngredients({ data }) {
  return (
    <section className="mr-5">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <IngredientsScrollbar ingredientsData={data} />
    </section>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired),
};
