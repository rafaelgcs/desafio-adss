import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import StartRequestPage from "./pages/StartRequestPage";
import SimulacaoTaxas from "./pages/SimulacaoTaxas";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SimulacaoTaxas} />
            {/* <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/cart" component={CartPage} />
      <PrivateRoute exact path="/cart/find" component={FindItem} />
      <PrivateRoute exact path="/cart/add" component={NewCart} />
      <PrivateRoute exact path="/cart/history" component={HistoryCart} />
      <PrivateRoute exact path="/cart/all" component={AllCart} />
      <PrivateRoute exact path="/clientes" component={ClientesPage} />
      <PrivateRoute exact path="/stock" component={StockPage} /> */}
            {/* <Route path="/signup" component={() => <h1>SignUp</h1>} /> */}
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;