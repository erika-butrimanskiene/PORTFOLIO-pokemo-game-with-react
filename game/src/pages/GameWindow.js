import React, { useContext } from 'react';
import { UserInfoContext } from '../App';
import { AuthenticationContext } from '../App';
import { Link } from 'react-router-dom';
import { GiBattleGear } from 'react-icons/gi';
import { GiBattleMech } from 'react-icons/gi';
import { AiOutlineShop } from 'react-icons/ai';
import { BsClipboardData } from 'react-icons/bs';

import './GameWindow.css';

//PAGES
import LoggedInUser from '../components/LoggedInUser';

function GameWindow() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //-- authentification
  const auth = useContext(AuthenticationContext);

  //ENDPOINTS

  const URL = 'http://localhost:5000/user/logout';

  //FUNCTIONS
  //-- handle user logout

  const handleLogout = async () => {
    let token = localStorage.getItem('game-auth');
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'game-token': token,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('game-auth');
      auth.setAuthentication(false);
    }
  };
  return (
    <main>
      <div className='game-window-wrapper'>
        <h1 className='game-window-heading'>LET'S START!</h1>
        <div className='game-window'>
          <LoggedInUser
            image={user.userInfo.image}
            username={user.userInfo.username}
            health={user.userInfo.health}
            gold={user.userInfo.gold}
            isArena={false}
          />

          <div className='game-window__links'>
            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/shop'>
                <AiOutlineShop size={55} />
                <span>SHOP</span>
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/inventory'>
                <GiBattleGear size={55} />
                <span>INVENTORY</span>
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/arena'>
                <GiBattleMech size={55} />
                <span>ARENA</span>
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/board'>
                <BsClipboardData size={50} />
                <span>BOARD</span>
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
