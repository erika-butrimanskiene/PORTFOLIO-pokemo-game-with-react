import React, { useContext } from 'react';
import { HandleShopContext } from '../pages/Shop';
import nextId from 'react-id-generator';
import Button from './Button';

import './Weapon.css';

function Weapon({
  name,
  damage,
  price,
  sellprice,
  special,
  image,
  type,
  showButton,
}) {
  //CONTEXTS
  //--handle shop
  const handleShop = useContext(HandleShopContext);

  //FUNCTIONS
  //-- handle shop

  let generatedId = nextId();
  const inventorItem = {
    id: generatedId,
    type,
    name,
    damage,
    price,
    sellprice,
    special,
    image,
  };

  return (
    <div className='weapon'>
      <div className='weapon__about'>
        <div
          className='weapon__icon'
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${image})`,
          }}
        ></div>
        <div className='weapon__info-container'>
          <p className='weapon__info'>
            Name: <span>{name}</span>
          </p>
          <p className='weapon__info'>
            Damage: <span>{damage}</span>{' '}
          </p>
          <p className='weapon__info'>
            Price: <span>{price}</span>
          </p>
          <p className='weapon__info'>
            Sell price: <span>{sellprice}</span>{' '}
          </p>
        </div>
      </div>
      {showButton && (
        <div
          className='weapon-buy'
          onClick={(e) => {
            handleShop.addInventoryToUser(e, price, inventorItem);
          }}
        >
          <Button className='button btn-pink' text='Buy' />
        </div>
      )}
      <p className='weapon__info special'>
        <span>{special}</span>
      </p>
    </div>
  );
}

export default Weapon;
