import { useState, useCallback } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPasswordReset } from "../services/actions/forgot-password";

export function ForgotPasswordPage() {
  const history = useHistory();
  const toResetPassword = useCallback(() => {
    history.replace({ pathname: "/reset-password" });
  }, [history]);

  const dispatch = useDispatch();

  const { passwordReset, passwordResetRequest, passwordResetFailed } =
    useSelector((state) => state.passwordReset);

  // const content = passwordResetFailed
  //   ? "Произошла ошибка при получении данных. Попробуйте отправить e-mail еще раз."
  //   : passwordResetRequest
  //   ? "text text_type_main-default" > "Отправка..."
  //   : toResetPassword();

  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleReset = () => {
    dispatch(postPasswordReset(emailValue));
    toResetPassword();
  };
  return (
    <main className="formWrapper">
      <form className="formMain">
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
        {/* {content} */}
        <Button
          className="mb-20"
          type="primary"
          size="medium"
          onClick={handleReset}
        >
          Восстановить
        </Button>
        <div className="secondaryFormActions mt-20 mb-4">
          <p className="text text_type_main-default text_color_inactive mr-2">
            Вспомнили пароль?
          </p>
          <Button type="secondary" size="medium">
            Войти
          </Button>
        </div>
      </form>
    </main>
  );
}
