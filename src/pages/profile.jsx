import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, getUser, patchUser } from "../services/actions/auth";
import {
  useHistory,
  useLocation,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { getCookie } from "../utils/cookie";

export function ProfilePage() {
  const { accessToken, userName, userEmail, userPassword } = useSelector(
    (state) => state.auth
  );
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const toLogout = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutRequest());
  }, []);

  const [nameValue, setNameValue] = useState("Марк");
  const nameInputRef = useRef(null);

  const [changeInput, setchangeInput] = useState(true);

  const onIconClick = () => {
    setchangeInput(changeInput === true ? false : true);
    setIsVisible(isVisible === false ? true : false);
  };

  const [emailValue, setEmailValue] = useState("mail@stellar.burgers");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState("******");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const consolle = useMemo(() => {
    dispatch(getUser());
    console.log(userName, userEmail);
    setNameValue(userName);
    setEmailValue(userEmail);
  }, [userName, userEmail, userPassword]);

  const changeData = (e) => {
    e.preventDefault();
    dispatch(
      patchUser(
        nameValue,
        emailValue,
        passwordValue === "******" ? "" : passwordValue
      )
    );
    setNameValue(userName);
    setEmailValue(userEmail);
    onIconClick();
  };

  const cancelChange = (e) => {
    console.log("hi");
    e.preventDefault();
    setNameValue(userName);
    setEmailValue(userEmail);
    onIconClick();
  };

  const addButtons = (
    <div className={styles.buttons}>
      <Button type="primary" size="medium" onClick={changeData}>
        Сохранить
      </Button>
      <Button type="primary" size="medium" onClick={cancelChange}>
        Отмена
      </Button>
    </div>
  );

  return (
    <>
      <main className="formWrapper">
        <form className="formMain">
          <div className="mb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setNameValue(e.target.value)}
              icon={"EditIcon"}
              onIconClick={onIconClick}
              value={nameValue}
              name={"name"}
              error={false}
              ref={nameInputRef}
              errorText={"Ошибка"}
              size={"default"}
              disabled={changeInput}
              // onFocus={() => setIsVisible(true)}
              // onBlur={() => setIsVisible(false)}
            />
          </div>

          <div className="mb-6">
            <Input
              type={"email"}
              icon={"EditIcon"}
              placeholder={"Логин"}
              onIconClick={onIconClick}
              onChange={onEmailChange}
              value={emailValue}
              name={"E-mail"}
              disabled={changeInput}
            />
          </div>

          <div className="mb-6">
            <Input
              type={"text"}
              onChange={onPasswordChange}
              value={passwordValue}
              name={"password"}
              placeholder={"Пароль"}
              disabled={changeInput}
              icon={"EditIcon"}
              onIconClick={onIconClick}
            />
          </div>
          {isVisible && addButtons}
        </form>
      </main>
      <nav className={styles.menu + " ml-5"}>
        <NavLink
          to="/profile"
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
            styles.menuElement +
            " text text_type_main-default text_color_inactive mt-20"
          }
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
    </>
  );
}
