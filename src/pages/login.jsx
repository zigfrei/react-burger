import { useState, useCallback } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

export function LoginPage() {
  const history = useHistory();

  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState("password");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const toRegistration = useCallback(() => {
    history.replace({ pathname: "/register" });
  }, [history]);

  const toForgotPassword = useCallback(() => {
    history.replace({ pathname: "/forgot-password" });
  }, [history]);

  return (
    <main className="formWrapper">
      <form className="formMain">
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
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
          Войти
        </Button>
        <div className="secondaryFormActions mt-20 mb-4">
          <p className="text text_type_main-default text_color_inactive mr-2">
            Вы — новый пользователь?
          </p>
          <Button type="secondary" size="medium" onClick={toRegistration}>
            Зарегистрироваться
          </Button>
        </div>
        <div className="secondaryFormActions">
          <p className="text text_type_main-default text_color_inactive mr-2">
            Забыли пароль?
          </p>
          <Button type="secondary" size="medium" onClick={toForgotPassword}>
            Восстановить пароль
          </Button>
        </div>
      </form>
    </main>
  );
}
