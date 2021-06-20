import React, { useContext, useRef } from 'react';
import { HandleShopContext } from '../pages/Shop';
import { HandleSellContext } from '../pages/Inventory';
import { SelectedInventoryContext } from '../pages/Arena';
import nextId from 'react-id-generator';
import Button from './Button';

import './Armor.css';

function Armor({
  name,
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

  //--handle inventory to fight selection
  const handleInventorySelection = useContext(SelectedInventoryContext);

  //REFS
  const selectedStyle = useRef();

  const inventorItem = {
    id: nextId(),
    name,
    type,
    defence,
    price,
    sellprice,
    image,
  };

  //FUNCTIONS
  //-- handle inventory set
  const selectArmor = () => {
    handleInventorySelection.setSelectedArmor({ image, defence });
  };

  const selectArmorStyle = () => {
    selectedStyle.current.style.border = '2px solid #aa0581';
    selectedStyle.current.style.borderRadius = '15px';
  };

  const unselectArmorStyle = () => {
    selectedStyle.current.style.border = 'none';
  };

  return (
    <div
      className='armor'
      onClick={toArenaModal ? selectArmor : undefined}
      onMouseEnter={toArenaModal ? selectArmorStyle : undefined}
      onMouseLeave={toArenaModal ? unselectArmorStyle : undefined}
    >
      <div className='armor__about'>
        <div
          ref={selectedStyle}
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
