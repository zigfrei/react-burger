import { useState, useCallback, useMemo } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation, useRouteMatch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPasswordReset } from "../services/actions/forgot-password";
import { deleteCookie, setCookie, getCookie } from "../utils/cookie";

export function ForgotPasswordPage() {
  const { state } = useLocation();
  const history = useHistory();



  const toResetPassword = () => {
    history.replace({ pathname: "/reset-password" });
  };

  const dispatch = useDispatch();

  const { passwordReset, passwordResetRequest, passwordResetFailed } =
    useSelector((state) => state.passwordReset);

  const [emailValue, setEmailValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  // const handleReset = useCallback((e) => {
  //   dispatch(postPasswordReset(emailValue));

  // };
  const handleReset = useCallback((e) => {
    e.preventDefault();
    dispatch(postPasswordReset(emailValue));
  }, [emailValue]);



  const toLogin = useCallback((e) => {
    e.preventDefault();
    history.replace({ pathname: "/login" });
  }, [history]);

console.log('forgot passwor pre run', localStorage.getItem('resetToken'));

if (getCookie("token")) {
  return <Redirect to={{pathname: '/'}} />;
}

  if (localStorage.getItem('resetToken')) {
    toResetPassword();
  }

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
          <Button type="secondary" size="medium" onClick={toLogin}>
            Войти
          </Button>
        </div>
      </form>
    </main>
  );
}
