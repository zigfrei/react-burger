import { useState, useRef, useCallback } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postNewPassword } from "../services/actions/reset-password";
import {
  useHistory,
  useLocation,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, setCookie, getCookie } from "../utils/cookie";

export function ResetPasswordPage() {
  const history = useHistory();
  const { state } = useLocation();
  const { passwordReset } = useSelector((state) => state.newPassword);
  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [newPasswordValue, setNewPasswordValue] = useState("");
  const newPasswordInputRef = useRef(null);
  const onIconClick = () => {
    //TODO ДОБАВИТЬ ЛОГИКУ СКРЫТИЯ СИМВОЛОВ
    setTimeout(() => newPasswordInputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [emailCode, setEmailCode] = useState("");
  const emailCodeInputRef = useRef(null);

  const handleSavePassword = useCallback((e) => {
      e.preventDefault();
      dispatch(postNewPassword(newPasswordValue, emailCode));
      toLogin();
    },
    [newPasswordValue, emailCode]
  );

  const toLogin = () => {
      history.replace({ pathname: "/login" });
    };

  console.log('reset page pre run', localStorage.getItem('resetToken'));

  if (!localStorage.getItem('resetToken') ){
    console.log('reset page run', passwordReset);
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  if (isLoggedIn) {
    return <Redirect to={{pathname: '/'}} />;
  }

  return (
    <main className="formWrapper">
      <form className="formMain" onSubmit={handleSavePassword}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>

        <div className="mb-6">
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            onChange={(e) => setNewPasswordValue(e.target.value)}
            icon={"ShowIcon"}
            value={newPasswordValue}
            name={"newPassword"}
            error={false}
            ref={newPasswordInputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>

        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setEmailCode(e.target.value)}
            icon={""}
            value={emailCode}
            name={"emailCode"}
            error={false}
            ref={emailCodeInputRef}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>

        <Button
          className="mb-20"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
        <div className="secondaryFormActions mt-20 mb-4">
          <p className="text text_type_main-default text_color_inactive mr-2">
            Вспомнили пароль?{" "}
          </p>
          <Button type="secondary" size="medium" onClick={toLogin}>
            Войти
          </Button>
        </div>
      </form>
    </main>
  );
}
