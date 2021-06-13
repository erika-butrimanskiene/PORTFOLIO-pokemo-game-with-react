import React, { useState } from 'react';
import Armors from '../components/Armors';
import Weapons from '../components/Weapons';
import Potions from '../components/Potions';

export const ShopErrorContext = React.createContext();

function Shop() {
  //STATES
  //-- shop error msg
  const [shopErr, setShopErr] = useState('');
  return (
    <main>
      <div>
        <h1>Shop</h1>
        <ShopErrorContext.Provider value={{ shopErr, setShopErr }}>
          <Armors />
          <Weapons />
          <Potions />
        </ShopErrorContext.Provider>
        {shopErr !== '' && <p>{shopErr}</p>}
      </div>
    </main>
  );
}

export default Shop;
