import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import NavigationBar from "./components/navbar";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import LogOut from "./pages/LogOut";
import Details from "./pages/Details";
import StudentResources from "./pages/StudentResources";
import StudyTools from "./pages/StudyTools";
import HealthAndWellbeing from "./pages/HealthAndWellbeing";
import Finance from "./pages/Finance";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/marketplace" element={<Marketplace />} />
        <Route
          exact
          path="/marketplace/:category/:id/details"
          element={<Details />}
        />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/register" element={<Register />} />
        <Route exact path="/auth/logout" element={<LogOut />} />
        <Route exact path="/add-listing" element={<CreateListing />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/profile/:id/edit" element={<EditProfile />} />
        <Route exact path="/studentresources" element={<StudentResources />} />
        <Route exact path="/studytools" element={<StudyTools />} />
        <Route exact path="/finance" element={<Finance />} />
        <Route
          exact
          path="/health&wellbeing"
          element={<HealthAndWellbeing />}
        />
      </Routes>
    </Router>
  );
};

export default App;
