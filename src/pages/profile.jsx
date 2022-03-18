import { useState, useRef } from "react";
import styles from './profile.module.css';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
  const [nameValue, setNameValue] = useState("Марк");
  const nameInputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => nameInputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [emailValue, setEmailValue] = useState("mail@stellar.burgers");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState("password");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

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
            value={nameValue}
            name={"name"}
            error={false}
            ref={nameInputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
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
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={"password"}
          />
        </div>


      </form>
    </main><nav className={styles.menu + " ml-5"}>
          <p className={styles.menuElement + " text text_type_main-medium"}>Профиль</p>
          <p className={styles.menuElement + " text text_type_main-medium text_color_inactive"}>История заказов</p>
          <p className={styles.menuElement + " text text_type_main-medium text_color_inactive"}>Выход</p>
          <p className={styles.menuElement + " text text_type_main-default text_color_inactive mt-20"}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav></>
  );
}
