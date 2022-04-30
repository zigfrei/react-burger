import { useState, useRef, useCallback } from "react";
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
import { postRegister } from "../services/actions/auth";
import { deleteCookie, setCookie, getCookie } from "../utils/cookie";

export function RegisterPage() {
  const { state } = useLocation();
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  // const [nameValue, setNameValue] = useState("");

  //TODO Реализовать нажатие на иконку
  const nameInputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => nameInputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const toRegister = useCallback(
    (e) => {
      e.preventDefault();
      console.log(form);
      dispatch(postRegister(form));
      console.log(accessToken, refreshToken);
    },
    [form, accessToken, refreshToken]
  );

  const toLogin = useCallback((e) => {
    e.preventDefault();
    history.replace({ pathname: "/login" });
  }, [history]);

  if (getCookie("token")) {
    return <Redirect to={{pathname: '/'}} />;
  }

  return (
    <main className="formWrapper">
      <form className="formMain" onSubmit={toRegister}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>

        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={""}
            value={form.name}
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
        >
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
