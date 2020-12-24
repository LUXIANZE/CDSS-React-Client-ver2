import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import {
  LoginPage,
  DashboardPage,
  ManagementPage,
  CliniciansManagementPage,
  PatientsManagementPage,
  DecisionTreeManagementPage,
  DecisionSupportPage,
  PatientDetailsPage,
  DecisionPage,
  NotFoundPage,
} from "./pages";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/dashboard">
        <DashboardPage />
      </Route>
      <Route exact path="/management">
        <ManagementPage />
      </Route>
      <Route exact path="/cliniciansmanagement">
        <CliniciansManagementPage />
      </Route>
      <Route exact path="/patientsmanagement">
        <PatientsManagementPage />
      </Route>
      <Route exact path="/decisiontreemanagement">
        <DecisionTreeManagementPage />
      </Route>
      <Route exact path="/decisionsupportpage">
        <DecisionSupportPage />
      </Route>
      <Route exact path="/patientdetailspage">
        <PatientDetailsPage />
      </Route>
      <Route exact path="/decisionpage">
        <DecisionPage />
      </Route>
      <Route exact path="/notfound">
        <NotFoundPage />
      </Route>
      <Redirect to="notfound" />
    </Switch>
  );
};

export default Routes;
