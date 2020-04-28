import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Landing from "./containers/Landing";
import NotFound from "./containers/NotFound";
import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import ResetPassword from "./containers/auth/ResetPassword";
import ChangePassword from "./containers/auth/ChangePassword";
import ChangeEmail from "./containers/auth/ChangeEmail";
import NewCharge from "./containers/billing/NewCharge";
import BoxTransfer from "./containers/box/BoxTransfer";
import Notes from "./containers/note/Notes";
import NewNote from "./containers/note/NewNote";
import NoteDetail from "./containers/note/NoteDetail";
import Settings from "./containers/auth/Settings";

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <UnauthenticatedRoute exact path="/login">
          <Login />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/signup">
          <Signup />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/login/reset">
          <ResetPassword />
        </UnauthenticatedRoute>
         <AuthenticatedRoute exact path="/settings/password">
          <ChangePassword />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/settings/email">
          <ChangeEmail />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/settings">
          <Settings />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/notes">
          <Notes />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/notes/new">
          <NewNote />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/notes/:id">
          <NoteDetail />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/billing">
          <NewCharge />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/box">
          <BoxTransfer />
        </AuthenticatedRoute>
        <Route>
          <NotFound />
        </Route>
    </Switch>
  );
}