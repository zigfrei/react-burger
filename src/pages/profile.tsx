import { NavigationProfile } from "./profile-navigation";
import { DataProfile } from "./profile-data";
import { OrdersProfile } from "./profile-orders";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { OrderInfoModal } from "./order-modal";

export function ProfilePage() {
  let location = useLocation();

  return (
    <>
      <NavigationProfile />
      {location.pathname === '/profile' && <DataProfile />}
      {location.pathname === '/profile/orders' && <OrdersProfile />}
    </>
  );
}
