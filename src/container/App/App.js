import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ADMIN_ROUTES, DEFAULT_ROUTES } from '../../constants';
import AdminRoute from '../../routes/AdminRoute';
import DefaultRoute from '../../routes/DefaultRoute';
import ModalHandler from '../../component/Modal/ModalHandler';
import GlobalLoading from '../../component/GlobalLoading';
import { Helmet } from 'react-helmet'
function renderAdminRoutes() {
  let xhtml = null
  xhtml = ADMIN_ROUTES.map(route => {
    return <AdminRoute
      key={route.path}
      path={route.path}
      component={route.component}
      exact={route.exact}
      name={route.name}
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
      component={route.component}
      exact={route.exact}
      name={route.name}
      attachProps={route.attachProps}
      privateRoute={route.privateRoute}
    />
  })
  return xhtml;
}

function App(props) {
  return (
    <div>
      <Helmet>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>
        <script src="ASCIIMathML.js"></script>
      </Helmet>
      <Router>
        <ModalHandler />
        <GlobalLoading />
        <Switch>
          {renderAdminRoutes()}
          {renderDefaultRoutes()}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
