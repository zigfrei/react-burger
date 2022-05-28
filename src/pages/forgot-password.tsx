import { useState, useCallback } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import { postPasswordReset } from "../services/actions/forgot-password";

export function ForgotPasswordPage() {
  const { state } = useLocation();
  const history = useHistory();

  const toResetPassword = () => {
    history.replace({ pathname: "/reset-password" });
  };

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(postPasswordReset(emailValue));
    },
    [emailValue]
  );

  const toLogin = useCallback(
    (e) => {
      e.preventDefault();
      history.replace({ pathname: "/login" });
    },
    [history]
  );

  console.log("zaloginen?", isLoggedIn);
  if (isLoggedIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  if (localStorage.getItem("resetToken")) {
    toResetPassword();
  }

  return (
    <main className="formWrapper">
      <form className="formMain" onSubmit={handleReset}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={onEmailChange}
            value={emailValue}
            name={"E-mail"}
          />
        </div>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
        <div className="secondaryFormActions mt-20 mb-4">
          <p className="text text_type_main-default text_color_inactive mr-2">
            Вспомнили пароль?
          </p>
          <Button type="secondary" size="medium" onClick={toLogin}>
            Войти
          </Button>
        </div>
      </form>
    </main>
  );
}
