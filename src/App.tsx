import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/appHeader.js';
import BurgerIngredients from "./components/BurgerIngredients/burgerIngredients.js";
import BurgerConstructor from "./components/BurgerConstructor/burgerConstructor.js";
import app from './app.module.css';
import {data} from './utils/data.js';


class App extends React.Component {
  state = {data}
  render(){
  return (
    <div className={app.page}>
  <header><AppHeader /></header>
  <main className={app.main}>
  <BurgerIngredients data = {this.state.data} />
  <BurgerConstructor data = {this.state.data}/>
    </main>
    </div>
  );
  }
}

export default App;
