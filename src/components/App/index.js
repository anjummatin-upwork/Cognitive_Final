import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import Home from "../Home";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import Overview from "../Overview";
// import AccountPage from "../Account";
import AdminPage from "../Admin";
import About from "../About";
import Blog from "../Blog";
import GetYourReport from "../GetYourReport";
import * as ROUTES from "../../constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import BlogDetails from "../BlogDetails/BlogDetails";
import Contact from "../Contact/Contact";
import ServiceDetails from "../ServiceDetails/ServiceDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Context from "../Context/Context";
import PostBlog from "../Blog/PostBlog";
import Account from "../Account";
import Billing from "../Billing/Billing";
import Legal from "../Legal/Legal"
import Reports from "../Reports/Reports"
import ReportDetails from './../Reports/ReportDetails';
const App = () => (
  <Context>
    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.Home} component={Home} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.About} component={About} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.Overview} component={Overview} />
        <Route path={ROUTES.Blog} component={Blog} />
        <Route path={ROUTES.BlogDetails} component={BlogDetails} />
        <Route path={ROUTES.ReportDetails} component={ReportDetails} />
        <Route path={ROUTES.Contact} component={Contact} />
        <Route path={ROUTES.Legal} component={Legal} />
        <Route exact path="/" >
           <Home></Home>
           </Route>
        <PrivateRoute path="/ServiceDetails/:ServiceId">
          <ServiceDetails></ServiceDetails>
        </PrivateRoute>
        <PrivateRoute path="/blogPost">
          <PostBlog />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.ACCOUNT}>
          <Account></Account>
        </PrivateRoute>
        <PrivateRoute path={ROUTES.GetYourReport}>
          <GetYourReport></GetYourReport>
        </PrivateRoute>
        <PrivateRoute path={ROUTES.Reports}>
          <Reports></Reports>
        </PrivateRoute>
        <PrivateRoute path="/Billing">
          <Billing></Billing>
        </PrivateRoute>
      </div>
    </Router>
  </Context>
);

export default App;
