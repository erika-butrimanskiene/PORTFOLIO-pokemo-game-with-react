import React from 'react';
import { RiCoinsFill } from 'react-icons/ri';

import './LoggedInUser.css';

import ProgressBar from '../components/ProgressBar';

function LoggedInUser({ image, username, health, gold }) {
  return (
    <div className='game-window__player'>
      {image && (
        <div
          className='game-window__player-avatar'
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${image})`,
          }}
        ></div>
      )}
      <h2 className='game-window__player-username'>{username}</h2>
      <div className='game-window__player-status'>
        <ProgressBar bgColor='#077285' completed={health} />
        <div className='game-window__player-gold'>
          <span>{gold}</span>
          <RiCoinsFill color={'gold'} size={25} />
        </div>
      </div>
    </div>
  );
}

export default LoggedInUser;
