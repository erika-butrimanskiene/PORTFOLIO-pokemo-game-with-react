import React from 'react';
import Armor from './Armor';

import './Armors.css';

function Armors() {
  return (
    <div className='armors-wrapper'>
      <h2 className='armors-heading'>Armors</h2>
      <p className='armors-about'>
        Armors adds defence to hero while he is fighting monsters
      </p>
      <div className='armors-items'>
        <Armor
          image={'icons8-body-armor-100.png'}
          defence={3}
          price={50}
          sellprice={10}
          type={'armor'}
          showBuyButton={true}
        />
        <Armor
          image={'icons8-body-armor-100.png'}
          defence={7}
          price={250}
          sellprice={100}
          type={'armor'}
          showBuyButton={true}
        />
        <Armor
          image={'icons8-body-armor-100.png'}
          defence={8}
          price={800}
          sellprice={300}
          type={'armor'}
          showBuyButton={true}
        />
      </div>
    </div>
  );
}

export default Armors;
