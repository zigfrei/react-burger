import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import personalAccount from "./personalAccount.module.css";

export default function PersonalAccount(props) {
  return (
    <div className={`ml-5 mr-2 mt-4 mb-4 ${personalAccount.div}`}>
      <ProfileIcon className="" type="secondary" />
      <p
        className={`text text_type_main-default ml-2 mr-5 ${personalAccount.p}`}
      >
        Личный кабинет
      </p>
    </div>
  );
}
