import React, { useContext, useRef } from 'react';
import { HandleShopContext } from '../pages/Shop';
import { HandleSellContext } from '../pages/Inventory';
import { SelectedInventoryContext } from '../pages/Arena';
import nextId from 'react-id-generator';
import Button from './Button';

import './Potion.css';

function Potion({
  heals,
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
  //--handle inventory to fight selection
  const handleInventorySelection = useContext(SelectedInventoryContext);

  //REFS
  const selectedStyle = useRef();

  //FUNCTIONS
  //-- handle inventory set
  const selectPotion = () => {
    handleInventorySelection.setSelectedPotion({ image, heals });
  };

  const selectPotionStyle = () => {
    selectedStyle.current.style.border = '2px solid #aa0581';
    selectedStyle.current.style.borderRadius = '15px';
  };

  const unselectPotionStyle = () => {
    selectedStyle.current.style.border = 'none';
  };

  const inventorItem = {
    id: nextId(),
    type,
    heals,
    price,
    sellprice,
    image,
  };

  return (
    <div
      className='potion'
      onClick={toArenaModal ? selectPotion : undefined}
      onMouseEnter={toArenaModal ? selectPotionStyle : undefined}
      onMouseLeave={toArenaModal ? unselectPotionStyle : undefined}
    >
      <div className='potion__about'>
        <div
          ref={selectedStyle}
          className='potion__icon'
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${image})`,
          }}
        ></div>
        <div className='potion__info-container'>
          <p className='potion__info'>
            Heals: <span>{heals} </span>{' '}
          </p>
          {showBuyButton && (
            <p className='potion__info'>
              Price: <span>{price} </span>
            </p>
          )}
          {!toArenaModal && (
            <p className='potion__info'>
              Sell price: <span>{sellprice} </span>{' '}
            </p>
          )}
        </div>
      </div>
      {showBuyButton && (
        <div
          className='potion-button'
          onClick={(e) => {
            handleShop.addInventoryToUser(e, price, inventorItem);
          }}
        >
          <Button className='button btn-pink' text='Buy' />
        </div>
      )}
      {showSellButton && (
        <div
          className='potion-button'
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

export default Potion;
