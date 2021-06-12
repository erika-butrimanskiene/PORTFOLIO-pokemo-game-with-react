import React from 'react';
import { Link } from 'react-router-dom';

function Player({ image, username, gold }) {
  return (
    <div className='player'>
      <div>{image}</div>
      <h3>{username}</h3>
      <p>amount of {gold}</p>
      <div>
        <button>
          <Link to={'/board/' + username}>See more</Link>
        </button>
      </div>
    </div>
  );
}

export default Player;
