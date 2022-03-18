import { useState, useRef, useCallback } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

export function RegisterPage() {
  const history = useHistory();
  const [nameValue, setNameValue] = useState("");
  const nameInputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => nameInputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const toLogin = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );

  return (
    <main className="formWrapper">
      <form className="formMain">
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>

        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setNameValue(e.target.value)}
            icon={""}
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
            placeholder={"E-mail"}
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
        <Button className="mb-20" type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <div className="secondaryFormActions mt-20 mb-4">
          <p className="text text_type_main-default text_color_inactive mr-2">
            Уже зарегистрированы?
          </p>
          <Button type="secondary" size="medium" onClick={toLogin}>
            Войти
          </Button>
        </div>
      </form>
    </main>
  );
}
