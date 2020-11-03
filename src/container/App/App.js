import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { ADMIN_ROUTES, DEFAULT_ROUTES } from '../../constants';
import AdminRoute from '../../routes/AdminRoute';
import DefaultRoute from '../../routes/DefaultRoute';
import ModalHandler from '../../component/Modal/ModalHandler';
function renderAdminRoutes() {
  let xhtml = null
  xhtml = ADMIN_ROUTES.map(route => {
    return <AdminRoute
      key={route.path}
      path={route.path}
      component = {route.component}
      exact = {route.exact}
      name = {route.name}
    />
  })
  return xhtml;
}

function renderDefaultRoutes() {
  let xhtml = null
  xhtml = DEFAULT_ROUTES.map(route => {
    return <DefaultRoute
      key={route.path}
      path={route.path}
      component = {route.component}
      exact = {route.exact}
      name = {route.name}
    />
  })
  return xhtml;
}

function App() {
  return (
      <Router>
        <ModalHandler/>
        <Switch>
          {renderAdminRoutes()}
          {renderDefaultRoutes()}
        </Switch>
      </Router>
  );
}

export default App;
