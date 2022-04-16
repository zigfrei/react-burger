import { useState, useCallback, useMemo, useEffect } from "react";
import { deleteCookie, setCookie, getCookie } from "../utils/cookie";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useHistory,
  useLocation,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../services/actions/auth";

export function LoginPage() {
  // let redirectPath = useLocation().state.from.pathname;
  // console.log(useLocation().state.from.pathname);
  const { state } = useLocation();
  const { authorizationSuccess, userName } = useSelector((state) => state.auth);

  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const history = useHistory();

  const toRegistration = useCallback(
    (e) => {
      e.preventDefault();
      history.replace({ pathname: "/register" });
    },
    [history]
  );

  const toForgotPassword = useCallback(
    (e) => {
      e.preventDefault();
      history.replace({ pathname: "/forgot-password" });
    },
    [history]
  );

  const consolle = useMemo(
    () =>
      console.log(
        getCookie("token"),
        "---",
        localStorage.getItem("refreshToken")
      ),
    [getCookie("token"), localStorage.getItem("refreshToken")]
  );

  const toLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequest(form));
      console.log(localStorage.getItem("refreshToken"));
    },
    [form]
  );

  console.log(state);

  if (localStorage.getItem("refreshToken")) {
    console.log(`Висит логин`);
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={state?.from || "/"}
      />
    );
  }

  return (
    <main className="formWrapper">
      <form className="formMain">
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
          />
        </div>
        <Button
          className="mb-20"
          type="primary"
          size="medium"
          onClick={toLogin}
        >
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
