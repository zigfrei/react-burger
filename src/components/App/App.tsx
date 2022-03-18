import AppHeader from "../AppHeader/appHeader.js";
import { BurgerIngredients } from "../BurgerIngredients/burgerIngredients.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor.js";
import app from "./app.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from "../../pages/index";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={app.page}>
      <header className={app.header}>
        <AppHeader />
      </header>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <main className={app.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="/profile" exact={true}>
            <ProfilePage />
          </Route>
          {/* <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}
