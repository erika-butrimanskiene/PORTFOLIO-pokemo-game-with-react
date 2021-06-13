import React from 'react';
import Armor from './Armor';

function Armors() {
  return (
    <div>
      <h2>Armors</h2>
      <p>Armors adds defence to hero while he is fighting monsters</p>
      <div>
        <Armor
          image={'imageurl'}
          defence={3}
          price={50}
          sellprice={10}
          type={'armor'}
        />
        <Armor
          image={'imageurl'}
          defence={7}
          price={250}
          sellprice={100}
          type={'armor'}
        />
        <Armor
          image={'imageurl'}
          defence={8}
          price={800}
          sellprice={300}
          type={'armor'}
        />
      </div>
    </div>
  );
}

export default Armors;
