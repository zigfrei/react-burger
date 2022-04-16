import AppHeader from "../AppHeader/appHeader.js";
import { BurgerIngredients } from "../BurgerIngredients/burgerIngredients.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor.js";
import app from "./app.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/protected-route.jsx";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  IngredientPageModal,
  NotFoundPage,
  SetOrderModal,
} from "../../pages/index";
import { Location } from "history";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={app.page}>
      <Router>
        <header className={app.header}>
          <AppHeader />
        </header>
        <ModalSwitch />
      </Router>
    </div>
  );
}

function ModalSwitch() {
  let location = useLocation<{
    background?: Location<{} | null | undefined>;
  }>();

  const background = location.state?.background;

  return (
    <div>
      <Switch location={background || location}>
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
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </ProtectedRoute>
        <Route>
            <NotFoundPage />
          </Route>
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && (
        <ProtectedRoute path="/ingredients/:id" children={<IngredientPageModal />} />
      )}
      {background && (
        <ProtectedRoute path="/set-order" exact={true} children={<SetOrderModal />} />
      )}
    </div>
  );
}
