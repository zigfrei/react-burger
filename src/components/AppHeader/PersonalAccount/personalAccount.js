import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function PersonalAccount(props) {
  return (
    <div className="mr-2">
      <ProfileIcon className="ml-5 mr-2" type="secondary" />
      <p className="text text_type_main-default mr-5">Личный кабинет</p>
    </div>
  );
}
