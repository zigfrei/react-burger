import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import Constructor from "./Constructor/constructor.js"
import OrderList from './OrderList/orderList.js';
import PersonalAccount from "./PersonalAccount/personalAccount.js"
import appHeader from "./appHeader.module.css"

export default function AppHeader(props) {

    return(
        <header >
            <nav className={`pt-4 pb-4 ${appHeader.nav}`}>
                <ul className={appHeader.ul}>
                    <li><a className={appHeader.a} href="#"><Constructor/></a></li>
                    <li><a className={appHeader.a} href="#"><OrderList/></a></li>
                    <li><a className={appHeader.a} href="#"><Logo/></a></li>
                    <li><a className={appHeader.a} href="#"><PersonalAccount/></a></li>
                </ul>
            </nav>


        </header>
    );
}
