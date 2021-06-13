import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import SignUp from '../src/pages/SignUp';
import GameWindow from './pages/GameWindow';
import Shop from './pages/Shop';
import Inventory from './pages/Inventory';
import Arena from './pages/Arena';
import Board from './pages/Board';
import ProtectedRoute from './pages/ProtectedRoute';
import PlayerDetail from './pages/PlayerDetail';

import './App.css';

export const AuthenticationContext = React.createContext();
export const UserInfoContext = React.createContext();

function App() {
  //STATES
  //-- authentication
  const [authentication, setAuthentication] = useState(false);
  //-- logged in user info
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);

  //EFFECTS
  //-- to set authentication and set userInfo
  useEffect(() => {
    const URL = 'http://localhost:5000/user';
    const token = localStorage.getItem('game-auth');
    const getUser = async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'game-token': token,
        },
      });
      const data = await response.json();
      await setUserInfo(data);
    };
    if (token) setAuthentication(true);
    if (token) {
      getUser();
    }
  }, []);

  return (
    <div className='App'>
      <AuthenticationContext.Provider
        value={{ authentication, setAuthentication }}
      >
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
          <Router>
            <Switch>
              <Route exact path='/signUp'>
                <SignUp />
              </Route>
              <ProtectedRoute exact path='/'>
                <GameWindow />
              </ProtectedRoute>
              <ProtectedRoute exact path='/shop'>
                <Shop />
              </ProtectedRoute>
              <ProtectedRoute exact path='/inventory'>
                <Inventory />
              </ProtectedRoute>
              <ProtectedRoute exact path='/arena'>
                <Arena />
              </ProtectedRoute>
              <ProtectedRoute exact path='/board'>
                <Board />
              </ProtectedRoute>
              <ProtectedRoute exact path='/board/:username'>
                <PlayerDetail />
              </ProtectedRoute>
            </Switch>
          </Router>
        </UserInfoContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
