import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import personalAccount from "./personalAccount.module.css";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

export default function PersonalAccount() {
  const history = useHistory();

  const toProfile = useCallback(() => {
    history.replace({ pathname: "/profile" });
  }, [history]);

  return (
    <div
      className={`ml-5 mr-2 mt-4 mb-4 ${personalAccount.div}`}
      onClick={toProfile}
    >
      <ProfileIcon type="secondary" />
      <p
        className={`text text_type_main-default ml-2 mr-5 ${personalAccount.p}`}
      >
        Личный кабинет
      </p>
    </div>
  );
}
