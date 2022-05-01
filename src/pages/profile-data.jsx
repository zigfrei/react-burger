import { useState, useRef, useMemo } from "react";
import styles from "./profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { patchUser, patchUserToken } from "../services/actions/auth";
import { useHistory } from "react-router-dom";
import { getCookie, isTokenExpired } from "../utils/cookie";

export function DataProfile() {
  const { userName, userEmail, userPassword } = useSelector(
    (state) => state.auth
  );

  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

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
    setNameValue(userName);
    setEmailValue(userEmail);
  }, [userName, userEmail, userPassword]);

  const changeData = (e) => {
    e.preventDefault();
    if (isTokenExpired(getCookie("token"))) {
      dispatch(
        patchUserToken(
          nameValue,
          emailValue,
          passwordValue === "******" ? "" : passwordValue
        )
      );
    } else {
      dispatch(
        patchUser(
          nameValue,
          emailValue,
          passwordValue === "******" ? "" : passwordValue
        )
      );
    }
    setNameValue(userName);
    setEmailValue(userEmail);
    onIconClick();
  };

  const cancelChange = (e) => {
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
      <section className="formWrapper">
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
      </section>
    </>
  );
}
