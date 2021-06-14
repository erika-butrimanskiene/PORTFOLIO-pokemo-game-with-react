import React, { useContext } from 'react';
import { HandleShopContext } from '../pages/Shop';
import nextId from 'react-id-generator';
import Button from './Button';

import './Potion.css';

function Potion({ heals, price, sellprice, image, type }) {
  //CONTEXTS
  //--handle shop
  const handleShop = useContext(HandleShopContext);

  //FUNCTIONS
  //-- handle shop

  let generatedId = nextId();
  const inventorItem = {
    id: generatedId,
    type,
    heals,
    price,
    sellprice,
    image,
  };

  return (
    <div className='potion'>
      <div className='potion__about'>
        <div
          className='potion__icon'
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${image})`,
          }}
        ></div>
        <div className='potion__info-container'>
          <p className='potion__info'>
            Heals: <span>{heals} </span>{' '}
          </p>
          <p className='potion__info'>
            Price: <span>{price} </span>
          </p>
          <p className='potion__info'>
            Sell price: <span>{sellprice} </span>{' '}
          </p>
        </div>
      </div>
      <div
        className='potion-buy'
        onClick={(e) => {
          handleShop.addInventoryToUser(e, price, inventorItem);
        }}
      >
        <Button className='button btn-pink' text='Buy' />
      </div>
    </div>
  );
}

export default Potion;
