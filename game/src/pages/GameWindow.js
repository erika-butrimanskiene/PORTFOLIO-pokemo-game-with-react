import React, { useContext } from 'react';
import { UserInfoContext } from '../App';
import { AuthenticationContext } from '../App';
import { Link } from 'react-router-dom';

import './GameWindow.css';

function GameWindow() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //-- authentification
  const auth = useContext(AuthenticationContext);

  //FUNCTIONS
  //-- handle user logout

  const handleLogout = () => {
    localStorage.removeItem('game-auth');
    auth.setAuthentication(false);
  };
  return (
    <main>
      <div className='game-window-wrapper'>
        <h1 className='game-window-heading'>GAME WINDOW</h1>
        <div className='game-window'>
          <div className='game-window__player'>
            <h3 className='game-window__player-username'>
              {user.userInfo.username}
            </h3>
            <div
              className='game-window__player-avatar'
              style={{
                backgroundImage: `url(http://localhost:5000/uploads/${user.userInfo.image})`,
              }}
            ></div>
            <div>
              <p>{user.userInfo.gold}</p>
              <p>{user.userInfo.health}</p>
            </div>
          </div>

          <div className='game-window__links'>
            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/shop'>
                SHOP
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/inventory'>
                INVENTORY
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/arena'>
                ARENA
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/board'>
                BOARD
              </Link>
            </div>

            <div className='game-window__logout' onClick={handleLogout}>
              LOGOUT
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GameWindow;
