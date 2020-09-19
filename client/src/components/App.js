import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product

import BloodLandingPage from "./views/LandingPage/LandingPage.blood";
import GroceryLandingPage from "./views/LandingPage/LandingPage.grocery";
import VolunteerLandingPage from "./views/LandingPage/LandingPage.volunteer";
import PoliceLandingPage from "./views/LandingPage/LandingPage.police";
import HotelLandingPage from "./views/LandingPage/LandingPage.hotel";
import HomeLandingPage from "./views/LandingPage/LandingPage.home";

import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

import BloodUpload from "./views/UploadProductPage/UploadBlood";
import GroceryUpload from "./views/UploadProductPage/UploadGrocery";
import VolunteerUpload from "./views/UploadProductPage/UploadVolunteer";
import PoliceUpload from "./views/UploadProductPage/UploadPolice";
import HotelUpload from "./views/UploadProductPage/UploadHotel";

import BloodDetailsPage from "./views/DetailProductPage/DetailsPage.blood";
import GroceryDetailsPage from "./views/DetailProductPage/DetailsPage.grocery";
import VolunteerDetailsPage from "./views/DetailProductPage/DetailsPage.volunteer";
import PoliceDetailsPage from "./views/DetailProductPage/DetailsPage.police";
import HotelDetailsPage from "./views/DetailProductPage/DetailsPage.hotel";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          {/* LANDING_PAGE */}

          <Route exact path='/blood' component={Auth(BloodLandingPage, null)} />
          <Route exact path='/' component={Auth(HomeLandingPage, null)} />

          <Route
            exact
            path='/grocery'
            component={Auth(GroceryLandingPage, null)}
          />
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
          <Route exact path='/hotel' component={Auth(HotelLandingPage, null)} />

          {/* /////LOGIN_REGISTRATION////// */}
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />

          {/* ///////UPLOAD_PAGE/////// */}

          <Route
            exact
            path='/blood/upload'
            component={Auth(BloodUpload, true)}
          />
          <Route
            exact
            path='/grocery/upload'
            component={Auth(GroceryUpload, true)}
          />
          <Route
            exact
            path='/volunteer/upload'
            component={Auth(VolunteerUpload, true)}
          />
          <Route
            exact
            path='/police/upload'
            component={Auth(PoliceUpload, true)}
          />
          <Route
            exact
            path='/hotel/upload'
            component={Auth(HotelUpload, true)}
          />

          {/* //////// DETAILS_PAGE////// */}

          <Route
            exact
            path='/blood/:bloodId'
            component={Auth(BloodDetailsPage, null)}
          />
          <Route
            exact
            path='/grocery/:groceryId'
            component={Auth(GroceryDetailsPage, null)}
          />
          <Route
            exact
            path='/volunteer/:volunteerId'
            component={Auth(VolunteerDetailsPage, null)}
          />

          <Route
            exact
            path='/police/:policeId'
            component={Auth(PoliceDetailsPage, null)}
          />
          <Route
            exact
            path='/hotel/:hotelId'
            component={Auth(HotelDetailsPage, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
