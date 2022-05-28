import style from "./not-found.module.css";

export function NotFoundPage() {
  return (
    <main className={style.middle}>
      <p className="text text_type_digits-large">404</p>
      <p className="text text_type_main-large">Страница не найдена.</p>
      <p className="text text_type_main-medium">
        К сожелению, такой страницы не существует. Вероятно, она была удалена
        автором с сервера, либо её здесь никогда не было.
      </p>
    </main>
  );
}
