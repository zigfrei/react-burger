import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { logoutRequest } from "../services/actions/auth";

export function NavigationProfile() {
  const dispatch = useDispatch();
  const toLogout = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutRequest());
  }, []);
  return (
    <>
      <nav className={styles.menu + " ml-5"}>
        <NavLink
          to="/profile"
          exact={true}
          className={styles.menuElement + " text text_type_main-medium"}
          activeClassName={
            styles.activeMenuElement + " text text_type_main-medium"
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={styles.menuElement + " text text_type_main-medium"}
          activeClassName={
            styles.activeMenuElement + " text text_type_main-medium"
          }
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          onClick={toLogout}
          className={styles.menuElement + " text text_type_main-medium"}
          activeClassName={
            styles.activeMenuElement + " text text_type_main-medium"
          }
        >
          Выход
        </NavLink>
        <p
          className={
            styles.menuLabel +
            " text text_type_main-default text_color_inactive mt-20"
          }
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
    </>
  );
}
