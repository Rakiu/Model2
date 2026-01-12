import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "./component/ScrollToTop";   // <-- ADD THIS

import LoginPage from "./component/LoginPage";
import Home from "./pages/front/Home";

import AddCity from "./component/AddCity";
import CityList from "./component/CityList";

import AdminProtectedRoute from "./component/Routes/AdminProtectedRoute";
import AllGirlsList from "./component/AllGirlsList";
import AddGirlForm from "./component/AddGirlForm";
import EditGirlForm from "./component/EditGirlForm";
import CityGirlsPage from "./component/CityGirlsPage";
import EditCity from "./component/EditCity";
import AboutUs from "./component/AboutUs";
import TermsAndConditions from "./component/Terms";
import PrivacyPolicy from "./component/PrivacyPolicy";
import Faqs from "./component/Feq";
import GirlDetailsPage from "./component/GirlDetailsPage";
import ContactPage from "./component/Contact";
import AddStateForm from "./component/AddStateForm";
import StateList from "./component/StateList";
import AllCities from "./component/CityList";
import AllContactsList from "./component/AllContactsList";

function App() {
  const location = useLocation();

  return (
    <div className="w-full">

      <ScrollToTop />   {/* <-- Auto Scroll on Route Change */}

      <Routes key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
     <Route path="/city/:cityName" element={<CityGirlsPage />} />
       <Route path="/girl/:girlName" element={<GirlDetailsPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
         <Route path="/privacy" element={<PrivacyPolicy />} />
         <Route path="/faq" element={<Faqs />} />

          <Route
          path="/admin/all-state"
          element={
            <AdminProtectedRoute>
              <StateList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/add-state"
          element={
            <AdminProtectedRoute>
              <AddStateForm />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/all-cities"
          element={
            <AdminProtectedRoute>
              <CityList />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-city/:cityId"
          element={
            <AdminProtectedRoute>
              <EditCity />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/create-city"
          element={
            <AdminProtectedRoute>
              <AddCity />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/model-girl"
          element={
            <AdminProtectedRoute>
              <AllGirlsList />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/add-girl"
          element={
            <AdminProtectedRoute>
              <AddGirlForm />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-girl/:id"
          element={
            <AdminProtectedRoute>
              <EditGirlForm />
            </AdminProtectedRoute>
          }
        />
          <Route
          path="/admin/all-contacts"
          element={
            <AdminProtectedRoute>
              <AllContactsList />
            </AdminProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
