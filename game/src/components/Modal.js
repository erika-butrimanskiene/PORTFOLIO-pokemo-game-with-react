import React from 'react';
import Armor from '../components/Armor';
import Weapon from '../components/Weapon';
import Potion from '../components/Potion';
import './Modal.css';

function Modal({ handleCloseModal, modalMsg, inventory, inventoryType }) {
  return (
    <div id='myModal' className='modal' onClick={handleCloseModal}>
      <div className='modal__content'>
        <div className='modal-close' onClick={handleCloseModal}>
          <span className='modal-close__span'>&times;</span>
        </div>
        <div className='modal-text'>{modalMsg}</div>
        {inventory !== undefined && (
          <div className='arena-window__player-inventory'>
            {inventory.length > 0 &&
              inventory
                .sort((a, b) => {
                  return a.type < b.type ? -1 : 1;
                })
                .map((inventoryItem, index) => {
                  let returnItem;

                  if (
                    inventoryItem.type === 'armor' &&
                    inventoryType === 'armor'
                  ) {
                    returnItem = (
                      <Armor
                        key={index}
                        index={index}
                        image={inventoryItem.image}
                        defence={inventoryItem.defence}
                        price={inventoryItem.price}
                        sellprice={inventoryItem.sellprice}
                        type={inventoryItem.type}
                        showBuyButton={false}
                        showSellButton={false}
                        toArenaModal={true}
                      />
                    );
                  }

                  if (
                    inventoryItem.type === 'weapon' &&
                    inventoryType === 'weapon'
                  ) {
                    returnItem = (
                      <Weapon
                        key={index}
                        index={index}
                        image={inventoryItem.image}
                        name={inventoryItem.name}
                        damage={inventoryItem.damage}
                        price={inventoryItem.price}
                        sellprice={inventoryItem.sellprice}
                        special={inventoryItem.special}
                        type={inventoryItem.type}
                        showBuyButton={false}
                        showSellButton={false}
                        toArenaModal={true}
                      />
                    );
                  }

                  if (
                    inventoryItem.type === 'potion' &&
                    inventoryType === 'potion'
                  ) {
                    returnItem = (
                      <Potion
                        key={index}
                        index={index}
                        heals={inventoryItem.heals}
                        price={inventoryItem.price}
                        sellprice={inventoryItem.sellprice}
                        image={inventoryItem.image}
                        type={inventoryItem.type}
                        showBuyButton={false}
                        showSellButton={false}
                        toArenaModal={true}
                      />
                    );
                  }
                  return returnItem;
                })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
