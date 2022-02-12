import AppHeader from '../AppHeader/appHeader.js';
import BurgerIngredients from "../BurgerIngredients/burgerIngredients.js";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor.js";
import app from './app.module.css';
import React from "react";
import {baseUrl} from '../../utils/constants.js';
import {BurgerFillContext} from '../../utils/burgerContext.js';



export default function App() {
const [state, setState] = React.useState({
  data:[],
  isLoading: true,
});
React.useEffect(()=>{
  const getData = async () =>{
    setState({...state, isLoading:true})

    try{
      const res = await fetch(baseUrl);
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
    const resData = await res.json();
    setState({data:resData.data, isLoading:false});

  }
    catch(error){
      console.log('Возникла проблема с вашим fetch запросом: ', error);
    }
  };
  getData();

}, [])
  return (
    <div className={app.page}>
  <header><AppHeader /></header>
  <main className={app.main}>
  {!state.isLoading && <BurgerIngredients data = {state.data} />}
  <BurgerFillContext.Provider value={{state, setState}}>
  {!state.isLoading && <BurgerConstructor/>}
  </BurgerFillContext.Provider>
    </main>
    </div>
  );
}


