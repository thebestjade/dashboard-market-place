import { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RegisterProduct from "./pages/RegisterProduct";
import EditProfile from "./pages/EditProfile";
import EditProduct from "./pages/EditProduct";
import TokenContext from "./contexts/token/TokenContext";
import TokenProvider from "./contexts/token/TokenProvider";
import UserProvider from "./contexts/user/UserProvider";
import ProductsProvider from "./contexts/products/ProductsProvider";
import "./styles.css";

function ProtectedRoutes(props) {
  const { token } = useContext(TokenContext);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function RedirectToProduct(props) {
  const { token } = useContext(TokenContext);

  return (
    <Route render={() => (!token ? props.children : <Redirect to="/produtos" />)} />
  );
}

function Routes() {
  return (
    <TokenProvider>
      <Router>
        <Switch>
          <Route path="/cadastro" component={RegisterUser} />
          <UserProvider>
              <RedirectToProduct>
              <Route path="/" component={Login} exact />
              </RedirectToProduct>
            <ProductsProvider>
              <ProtectedRoutes>
                <Route path="/produtos" component={Home} exact />
                <Route path="/produtos/novo" exact component={RegisterProduct} />
                <Route path="/produtos/:id/editar" exact component={EditProduct} />
                <Route path="/perfil" exact component={Profile} />
                <Route path="/perfil/editar" exact component={EditProfile} />
              </ProtectedRoutes>
            </ProductsProvider>
          </UserProvider>
        </Switch>
      </Router>
    </TokenProvider>
  );
}

export default Routes;
