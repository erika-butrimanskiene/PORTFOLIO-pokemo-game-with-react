import React, { useContext } from 'react';
import { HandleShopContext } from '../pages/Shop';
import nextId from 'react-id-generator';
import Button from './Button';

import './Armor.css';

function Armor({ defence, price, sellprice, image, type }) {
  //CONTEXTS
  //--handle shop
  const handleShop = useContext(HandleShopContext);

  //FUNCTIONS
  //-- handle shop

  let generatedId = nextId();
  const inventorItem = {
    id: generatedId,
    type,
    defence,
    price,
    sellprice,
    image,
  };

  return (
    <div className='armor'>
      <div className='armor__about'>
        <div
          className='armor__icon'
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${image})`,
          }}
        ></div>
        <div className='armor__info-container'>
          <p className='armor__info'>
            Defence: <span>{defence} </span>{' '}
          </p>
          <p className='armor__info'>
            Price: <span>{price} </span>
          </p>
          <p className='armor__info'>
            Sell price: <span>{sellprice} </span>{' '}
          </p>
        </div>
      </div>
      <div
        className='armor-buy'
        onClick={(e) => {
          handleShop.addInventoryToUser(e, price, inventorItem);
        }}
      >
        <Button className='button btn-pink' text='Buy' />
      </div>
    </div>
  );
}

export default Armor;
