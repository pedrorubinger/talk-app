import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import { Home } from './pages/Home';
import { Contribute } from './pages/Contribute';
import { Chat } from './pages/Chat';
import { Help } from './pages/Help';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';

export function Router() {
    return (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={ Home }
            />

            <Route
              exact
              path="/contribute"
              component={ Contribute }
            />
            
            <Route
              exact
              path="/help"
              component={ Help }
            />
            
            <Route
              exact
              path="/signin"
              render={props => <Login {...props} formType="signin" />}
            />

            <Route
              exact
              path="/signup"
              render={props => <Login {...props} formType="signup" />}
            />

            <PrivateRoute
              exact
              path="/chat"
              component={ Chat }
            />

            <PrivateRoute
              exact
              path="/profile"
              component={ Profile }
            />
            
            <Route
              path="/"
              component={ NotFound }
            />
          </Switch>
        </BrowserRouter>
    );
}