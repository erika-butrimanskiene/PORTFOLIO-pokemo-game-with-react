import React from 'react';

import './EnemyProfile.css';

import ProgressBar from '../components/ProgressBar';

function EnemyProfile({
  image,
  enemyname,
  health,
  damage,
  enemyAnimationClass,
}) {
  return (
    <div className='arena-window__enemy'>
      <div>
        {image && (
          <div
            className={`arena-window__enemy-avatar ${enemyAnimationClass}`}
            style={{
              backgroundImage: `url(http://localhost:5000/uploads/${image})`,
            }}
          ></div>
        )}
        <h2 className='arena-window__enemy-name'>{enemyname}</h2>
      </div>
      <div className='arena-window__enemy-status'>
        <ProgressBar bgColor='#077285' completed={health} />
      </div>
    </div>
  );
}

export default EnemyProfile;
