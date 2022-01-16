import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/appHeader.js';
import BurgerIngredients from "./components/BurgerIngredients/burgerIngredients.js";
import app from './app.module.css';
import {data} from './utils/data.js';


class App extends React.Component {
  state = {data}
  render(){
  return (
    <div className="App">
  <header><AppHeader /></header>
  <main className={app.main}>
  <BurgerIngredients data = {this.state.data} />
<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cum quis doloribus libero sit ducimus! Laudantium similique amet, labore rem nisi fugiat quisquam quod et rerum, praesentium porro officiis quasi!</div>
  </main>
    </div>
  );
  }
}

export default App;
