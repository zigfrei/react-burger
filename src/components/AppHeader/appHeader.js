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
            <a className={appHeader.a} href="#">
              <Constructor />
            </a>
          </li>
          <li className={appHeader.li}>
            <a className={appHeader.a} href="#">
              <OrderList />
            </a>
          </li>
        </div>
        <li className={appHeader.li}>
          <a className={appHeader.a} href="#">
            <Logo />
          </a>
        </li>
        <li className={appHeader.lastLi}>
          <a className={appHeader.a} href="#">
            <PersonalAccount />
          </a>
        </li>
      </ul>
    </nav>
  );
}
