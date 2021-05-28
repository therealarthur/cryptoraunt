import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./contexts/RestaurantsContext";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdateRestaurantPage";
import ReviewList from "./components/ReviewList";
import Wallet from "./components/Wallet";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import AddRestaurants from "./components/AddRestaurants";
import UpdateMenu from "./components/UpdateMenu";
import Search from "./components/Search";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <AuthProvider>
        <div className="container">
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search/" component={Search} />
              <Route exact path="/restaurants/add" component={AddRestaurants} />
              <Route
                exact
                path="/restaurants/:id/update"
                component={UpdatePage}
              />
              <Route
                exact
                path="/restaurants/:id/menuItem/update"
                component={UpdateMenu}
              />
              <Route
                exact
                path="/restaurants/:id"
                component={RestaurantDetailPage}
              />
              <Route
                exact
                path="/restaurants/:id/review"
                component={ReviewList}
              />
              <Route exact path="/users/:id/wallet" component={Wallet} />
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </RestaurantsContextProvider>
  );
};

export default App;
