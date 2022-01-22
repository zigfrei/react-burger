import AppHeader from '../AppHeader/appHeader.js';
import BurgerIngredients from "../BurgerIngredients/burgerIngredients.js";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor.js";
import app from './app.module.css';
import {data} from '../../utils/data.js';



export default function App() {
  return (
    <div className={app.page}>
  <header><AppHeader /></header>
  <main className={app.main}>
  <BurgerIngredients data = {data} />
  <BurgerConstructor data = {data}/>
    </main>
    </div>
  );
}


