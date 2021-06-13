import React from 'react';
import Potion from '../components/Potion';

function Potions() {
  return (
    <div>
      <h2>Potions</h2>
      <p>Potions is needed to heal player during the battle</p>
      <div>
        <Potion
          heals={20}
          price={10}
          sellprice={5}
          image={'image'}
          type={'potion'}
        />
        <Potion
          heals={35}
          price={30}
          sellprice={10}
          image={'image'}
          type={'potion'}
        />
        <Potion
          heals={50}
          price={60}
          sellprice={20}
          image={'image'}
          type={'potion'}
        />
      </div>
    </div>
  );
}

export default Potions;
