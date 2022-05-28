import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Constructor from "./Constructor/constructor";
import OrderList from "./OrderList/orderList";
import PersonalAccount from "./PersonalAccount/personalAccount";
import appHeader from "./appHeader.module.css";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

export default function AppHeader() {
  const history = useHistory();

  const toMain = useCallback(() => {
    history.replace({ pathname: "/" });
  }, [history]);

  return (
    <nav className={`pt-4 pb-4`}>
      <ul className={appHeader.ul}>
        <div className={appHeader.listItem}>
          <li className={appHeader.li}>
            <Constructor />
          </li>
          <li className={appHeader.li}>
            <OrderList />
          </li>
        </div>
        <li className={appHeader.li} onClick={toMain}>
          <Logo />
        </li>
        <li className={appHeader.lastLi}>
          <PersonalAccount />
        </li>
      </ul>
    </nav>
  );
}
