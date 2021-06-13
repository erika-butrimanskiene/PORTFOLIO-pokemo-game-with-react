import React, { useContext } from 'react';
import { UserInfoContext } from '../App';
import { ShopErrorContext } from '../pages/Shop';
import nextId from 'react-id-generator';
import Button from './Button';
import './Potion.css';

function Potion({ heals, price, sellprice, image, type }) {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //-- shop err
  const shopErr = useContext(ShopErrorContext);

  //FUNCTIONS
  const addPotionToUser = (e) => {
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
            heals,
            price,
            sellprice,
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
      <p>Heals: {heals} </p>
      <p>Price: {price}</p>
      <p>Sell price: {sellprice} </p>
      <p>Type: {type}</p>
      <div className='potion-buy' onClick={addPotionToUser}>
        <Button className='button btn-pink' text='Buy' />
      </div>
    </div>
  );
}

export default Potion;
