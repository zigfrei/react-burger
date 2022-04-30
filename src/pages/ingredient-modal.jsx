import IngredientDetails from "../components/BurgerIngredients/IngredientDetails/ingredientDetails.js";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "../components/Modal/modal";

export function IngredientPageModal() {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { id } = useParams();
  const history = useHistory();
  const ingredient = burgerIngredients.find((element) => element._id === id);

  const onClose = () => {
    history.goBack();
  };

  const modal = (
    <Modal onClose={onClose} title="Детали ингредиента">
      <IngredientDetails {...ingredient} />
    </Modal>
  );
  return (
    <>
      {ingredient && modal}
    </>
  );
}
