import React, { useContext } from 'react';
import { HandleShopContext } from '../pages/Shop';
import { HandleSellContext } from '../pages/Inventory';
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
          {showBuyButton && (
            <p className='weapon__info'>
              Name: <span>{name}</span>
            </p>
          )}
          <p className='weapon__info'>
            Damage: <span>{damage}</span>{' '}
          </p>
          {showBuyButton && (
            <p className='weapon__info'>
              Price: <span>{price}</span>
            </p>
          )}
          {!toArenaModal && (
            <p className='weapon__info'>
              Sell price: <span>{sellprice}</span>{' '}
            </p>
          )}
        </div>
      </div>
      {showBuyButton && (
        <div
          className='weapon-button'
          onClick={(e) => {
            handleShop.addInventoryToUser(e, price, inventorItem);
          }}
        >
          <Button className='button btn-pink' text='Buy' />
        </div>
      )}

      {showSellButton && (
        <div
          className='weapon-button'
          onClick={(e) => {
            handleSell.removeInventoryFromUser(e, sellprice, index);
          }}
        >
          <Button className='button btn-pink' text='Sell' />
        </div>
      )}

      <p className='weapon__info special'>
        <span>{special}</span>
      </p>
    </div>
  );
}

export default Weapon;
