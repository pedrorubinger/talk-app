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
import { ChatSettings } from './pages/ChatSettings';
import { SearchResult } from './pages/SearchResult';
import UserProvider from './context/UserContext';
import FriendRequestProvider from './context/FriendRequestContext';

export function Router() {
    return (
        <UserProvider>
          <FriendRequestProvider>
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
                  path="/profile/me"
                  component={ Profile }
                />

                <PrivateRoute
                  exact
                  path="/search/"
                  component={ SearchResult }
                />

                <PrivateRoute
                  exact
                  path="/settings"
                  component={ ChatSettings }
                />
                
                <Route
                  path="/"
                  component={ NotFound }
                />
              </Switch>
            </BrowserRouter>
          </FriendRequestProvider>
        </UserProvider>
    );
}