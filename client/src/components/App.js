import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import GroceryLandingPage from "./views/LandingPage/GroceryLandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import GroceryUploadProductPage from "./views/UploadProductPage/GroceryUploadProductPage";
import BloodUploadProductPage from "./views/UploadProductPage/BloodUploadProductPage";

import HomeLandingPage from "./views/LandingPage/HomeLandingPage";
import GroceryDetailProductPage from "./views/DetailProductPage/GroceryDetailProductPage";
import BloodLandingPage from "./views/LandingPage/BloodLandingPage";
import BloodDetailPage from "./views/DetailProductPage/BloodDetailPage";
//////

import VolunteerLandingPage from "./views/LandingPage/VolunteerLandingPage";
import PoliceLandingPage from "./views/LandingPage/PoliceLandingPage";
//upload
import VolunteerUploadProductPage from "./views/UploadProductPage/VolunteerUploadProductPage";
import PoliceUploadProductPage from "./views/UploadProductPage/PoliceUploadProductPage";
//detail
import PoliceDetailPage from "./views/DetailProductPage/PoliceDetailProductPage";
import VolunteerDetailPage from "./views/DetailProductPage/VolunteerDetailPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path='/' component={Auth(HomeLandingPage, false)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />

          <Route
            exact
            path='/grocery'
            component={Auth(GroceryLandingPage, null)}
          />
          <Route exact path='/blood' component={Auth(BloodLandingPage, null)} />
          <Route
            exact
            path='/volunteer'
            component={Auth(VolunteerLandingPage, null)}
          />
          <Route
            exact
            path='/police'
            component={Auth(PoliceLandingPage, null)}
          />

          <Route
            exact
            path='/groceryRoute/:groceryId'
            component={Auth(GroceryDetailProductPage, null)}
          />
          <Route
            exact
            path='/bloodRoute/:bloodId'
            component={Auth(BloodDetailPage, null)}
          />
          <Route
            exact
            path='/volunteerRoute/:volunteerId'
            component={Auth(VolunteerDetailPage, null)}
          />
          <Route
            exact
            path='/policeRoute/:policeId'
            component={Auth(PoliceDetailPage, null)}
          />

          <Route
            exact
            path='/blood/bloodUpload'
            component={Auth(BloodUploadProductPage, true)}
          />
          <Route
            exact
            path='/grocery/groceryUpload'
            component={Auth(GroceryUploadProductPage, true)}
          />
          <Route
            exact
            path='/volunteer/volunteerUpload'
            component={Auth(VolunteerUploadProductPage, true)}
          />
          <Route
            exact
            path='/police/policeUpload'
            component={Auth(PoliceUploadProductPage, true)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
