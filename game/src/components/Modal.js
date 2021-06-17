import React from 'react';
import InventoryList from './InventoryList';
import './Modal.css';

function Modal({ handleCloseModal, modalMsg, inventory, inventoryType }) {
  return (
    <div id='myModal' className='modal' onClick={handleCloseModal}>
      <div className='modal__content'>
        <div className='modal-close' onClick={handleCloseModal}>
          <span className='modal-close__span'>&times;</span>
        </div>
        {modalMsg ===
          'DEAD. You health is restored to 100 and inventory list is emptied.' && (
          <div
            className='arena-window__dead-img'
            style={{
              backgroundImage: `url(http://localhost:5000/uploads/rip.png)`,
            }}
          ></div>
        )}
        <div className='modal-text'>{modalMsg}</div>
        {inventory !== undefined && (
          <div className='arena-window__player-inventory'>
            <InventoryList
              inventory={inventory}
              inventoryType={inventoryType}
              showSellButton={false}
              toArenaModal={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
