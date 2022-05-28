import { useState, useRef, useCallback } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import { postRegister } from "../services/actions/auth";

export function RegisterPage() {
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const { isLoggedIn } = useSelector((state) => state.auth);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const history = useHistory();

  const nameInputRef = useRef(null);

  const toRegister = useCallback(
    (e) => {
      e.preventDefault();
      console.log(form);
      dispatch(postRegister(form));
    },
    [form]
  );

  const toLogin = useCallback(
    (e) => {
      e.preventDefault();
      history.replace({ pathname: "/login" });
    },
    [history]
  );

  if (isLoggedIn) {
    return <Redirect to={{ pathname: "/" }} />;
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
            icon={undefined}
            value={form.name}
            name={"name"}
            error={false}
            ref={nameInputRef}
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
        <Button type="primary" size="medium">
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
