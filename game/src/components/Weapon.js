import React, { useContext } from 'react';
import { UserInfoContext } from '../App';
import { ShopErrorContext } from '../pages/Shop';
import nextId from 'react-id-generator';
import Button from './Button';

import './Weapon.css';

function Weapon({ name, damage, price, sellprice, special, image, type }) {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //-- shop err
  const shopErr = useContext(ShopErrorContext);

  //FUNCTIONS
  const addWeaponToUser = (e) => {
    e.preventDefault();
    let generatedId = nextId();
    if (user.userInfo.gold >= price) {
      user.setUserInfo({
        ...user.userInfo,
        inventory: [
          ...user.userInfo.inventory,
          {
            id: generatedId,
            type,
            name,
            damage,
            price,
            sellprice,
            special,
            image,
          },
        ],
        gold: user.userInfo.gold - price,
      });
    } else {
      shopErr.setShopErr("You don't have enough money");
    }
  };

  return (
    <div>
      <div>Image: {image}</div>
      <p>Name: {name}</p>
      <p>Damage: {damage} </p>
      <p>Special: {special}</p>
      <p>Price: {price}</p>
      <p>Sell price: {sellprice} </p>
      <p>Type: {type}</p>
      <div className='weapon-buy' onClick={addWeaponToUser}>
        <Button className='button btn-pink' text='Buy' />
      </div>
    </div>
  );
}

export default Weapon;
