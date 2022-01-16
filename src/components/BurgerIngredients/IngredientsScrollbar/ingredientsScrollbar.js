import ingredientsScrollbar from "./ingredientsScrollbar.module.css";
import TemplateIngredient from "../TemplateIngredient/templateIngredient.js";

export default function IngredientsScrollbar({ ingredientsData }) {
  const bun = [];
  const sauce = [];
  const filling = [];
  ingredientsData.forEach((ingredient) => {
    if (ingredient.type == "bun") {
      bun.push(ingredient);
    } else if (ingredient.type == "sauce") {
      sauce.push(ingredient);
    } else {
      filling.push(ingredient);
    }
  });
  return (
    <ul className={ingredientsScrollbar.section}>
      <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
      <div className={`${ingredientsScrollbar.element} pl-4`}>
        {bun.map((ingredient, index) => (
          <TemplateIngredient key={index} ingredient={ingredient} />
        ))}
      </div>
      <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
      <div className={`${ingredientsScrollbar.element} pl-4`}>
        {sauce.map((ingredient, index) => (
          <TemplateIngredient key={index} ingredient={ingredient} />
        ))}
      </div>
      <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
      <div className={`${ingredientsScrollbar.element} pl-4`}>
        {filling.map((ingredient, index) => (
          <TemplateIngredient key={index} ingredient={ingredient} />
        ))}
      </div>
    </ul>
  );
}
{
}
