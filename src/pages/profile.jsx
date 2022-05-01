import { NavigationProfile } from "./profile-navigation";
import { DataProfile } from "./profile-data";
import { OrdersProfile } from "./profile-orders";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { OrderInfoModal } from "./order-modal";

export function ProfilePage() {
  let location = useLocation();

  return (
    <>
      {/* <Router>
        <NavigationProfile />
        <Switch >
          <Route path="/profile" exact={true} children={<DataProfile />} />
          <Route path="/profile/orders" exact={true} component={OrdersProfile} />
        </Switch>
      </Router> */}
      <NavigationProfile />
      {location.pathname === '/profile' && <DataProfile />}
      {location.pathname === '/profile/orders' && <OrdersProfile />}
    </>
  );
}
