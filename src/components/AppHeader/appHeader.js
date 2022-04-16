import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Constructor from "./Constructor/constructor.js";
import OrderList from "./OrderList/orderList.js";
import PersonalAccount from "./PersonalAccount/personalAccount.js";
import appHeader from "./appHeader.module.css";

export default function AppHeader(props) {
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
        <li className={appHeader.li}>
          <Logo />
        </li>
        <li className={appHeader.lastLi}>
          <PersonalAccount />
        </li>
      </ul>
    </nav>
  );
}
