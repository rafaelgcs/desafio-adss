import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import { isAuthenticated } from "./services/auth";

// import StartRequestPage from "./pages/StartRequestPage";
import SimulacaoTaxas from "./pages/SimulacaoTaxas";
import SelectClient from "./pages/SelectClient";
import SelectType from "./pages/SelectType";
import CardData from "./pages/CardData";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             isAuthenticated() ? (
//                 <Component {...props} />
//             ) : (
//                     <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
//                 )
//         }
//     />
// );

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SimulacaoTaxas} />
            <Route exact path="/select-client" component={SelectClient} />
            <Route exact path="/select-type" component={SelectType} />
            <Route exact path="/credit-data" component={CardData} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;