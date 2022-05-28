import {IngredientDetails} from "../components/BurgerIngredients/IngredientDetails/ingredientDetails";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import { useSelector } from "../services/hooks";
import { Modal } from "../components/Modal/modal";
import {TUrlID} from "../services/types/data";

export function IngredientPageModal() {
  const { burgerIngredients } = useSelector((state) => state.burgerIngredients);
  const { id } = useParams<TUrlID>();
  const history = useHistory();
  const ingredient = burgerIngredients.find((element) => element._id === id);

  const onClose = () => {
    history.goBack();
  };

  const modal = (
    <Modal onClose={onClose} title="Детали ингредиента">
      {ingredient && <IngredientDetails ingredient={ingredient} />}
    </Modal>
  );
  return (
    <>
      {ingredient && modal}
    </>
  );
}
