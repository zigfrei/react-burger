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
import { deleteCookie, setCookie, getCookie, isTokenExpired } from "../../utils/cookie";
import { getUser, getUserToken } from "../../services/actions/auth.js";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const initUser = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && (refreshToken !== 'null')) {
      if (isTokenExpired(getCookie("token"))) {
        dispatch(getUserToken());
      } else {
        dispatch(getUser());
      }
    };
  };

  useEffect(() => {
    initUser();
  }, []);



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
  const location = useLocation<{
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
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route>
            <NotFoundPage />
          </Route>
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && (
        <Route path="/ingredients/:id" children={<IngredientPageModal />} />
      )}
      {background && (
        <ProtectedRoute path="/set-order" exact={true} children={<SetOrderModal />} />
      )}
    </div>
  );
}
