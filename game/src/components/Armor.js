import React, { useContext } from 'react';
import { HandleShopContext } from '../pages/Shop';
import { HandleSellContext } from '../pages/Inventory';
import nextId from 'react-id-generator';
import Button from './Button';

import './Armor.css';

function Armor({
  defence,
  price,
  sellprice,
  image,
  type,
  showBuyButton,
  showSellButton,
  toArenaModal,
  index,
}) {
  //CONTEXTS
  //--handle shop
  const handleShop = useContext(HandleShopContext);

  //--handle sell
  const handleSell = useContext(HandleSellContext);

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
          {showBuyButton && (
            <p className='armor__info'>
              Price: <span>{price} </span>
            </p>
          )}
          {!toArenaModal && (
            <p className='armor__info'>
              Sell price: <span>{sellprice} </span>{' '}
            </p>
          )}
        </div>
      </div>
      {showBuyButton && (
        <div
          className='armor-button'
          onClick={(e) => {
            handleShop.addInventoryToUser(e, price, inventorItem);
          }}
        >
          <Button className='button btn-pink' text='Buy' />
        </div>
      )}

      {showSellButton && (
        <div
          className='armor-button'
          onClick={(e) => {
            handleSell.removeInventoryFromUser(e, sellprice, index);
          }}
        >
          <Button className='button btn-pink' text='Sell' />
        </div>
      )}
    </div>
  );
}

export default Armor;
