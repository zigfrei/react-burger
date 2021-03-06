import AppHeader from "../AppHeader/appHeader";
import { BurgerIngredients } from "../BurgerIngredients/burgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";
import app from "./app.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation, useHistory
} from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute/protected-route";
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
  OrderFeed,
  OrderInfoModal,
  OrderInfo,
} from "../../pages/index";
import { Location } from "history";
import { getCookie, isTokenExpired } from "../../utils/cookie";
import { getUser, getUserToken } from "../../services/actions/auth";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const initUser = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && refreshToken !== "null") {
      if (isTokenExpired(getCookie("token"))) {
        dispatch(getUserToken());
      } else {
        dispatch(getUser());
      }
    }
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
  const history = useHistory();
  const location = useLocation<{
    background?: Location<{} | null | undefined>;
  }>();

  const background = location.state?.background;

  useEffect(() => {
    history.replace({ pathname: location.pathname, state: undefined })
  }, [])

console.log(location, background);

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
        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderInfo />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route path="/feed" exact={true}>
          <OrderFeed />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderInfo />
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
        <ProtectedRoute
          path="/profile/orders/:id"
          exact={true}
          children={<OrderInfoModal />}
        />
      )}
      {background && <Route path="/feed/:id" children={<OrderInfoModal />} />}

      {background && (
        <ProtectedRoute
          path="/set-order"
          exact={true}
          children={<SetOrderModal />}
        />
      )}
    </div>
  );
}
