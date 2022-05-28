export type TIngredient = {
  id: string;
  key: string;
};

export type TUser = {
  email?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
};

export type TBurgerBun = {
  id: string;
};

export type TType = "bun" | "main" | "sauce";

export type TburgerIngredients = {
  readonly _id: string;
  readonly name: string;
  readonly type: TType;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TTabCurrent = "Булки" | "Соусы" | "Начинки";
export type TOrderStatus = string;

export type TOrder = {
  readonly ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly status: TOrderStatus;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly name: string;
};

export type TUrlID = {
  id: string;
};
