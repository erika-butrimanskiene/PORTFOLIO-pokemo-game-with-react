import React from 'react';
import Weapon from './Weapon';

function Weapons() {
  return (
    <div>
      <h2>Weapons</h2>
      <p>
        Weapons defines how much damage hero does to monster and have special
        effects
      </p>
      <div>
        <Weapon
          image={'imageLink'}
          name={'Sword'}
          damage={8}
          price={40}
          sellprice={5}
          special={'has 20% chance to block enemy attack'}
          type={'weapon'}
        />
        <Weapon
          image={'imageLink'}
          name={'Bow'}
          damage={6}
          price={300}
          sellprice={80}
          special={'has 30% chance to do double damage'}
          type={'weapon'}
        />
        <Weapon
          image={'imageLink'}
          name={'Magic wand'}
          damage={5}
          price={1000}
          sellprice={400}
          special={
            'has 40% chance to heal hero on enemy attack by 10hit points'
          }
          type={'weapon'}
        />
      </div>
    </div>
  );
}

export default Weapons;
