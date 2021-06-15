import React from 'react';
import './Modal.css';

function Modal({ handleCloseModal, modalMsg }) {
  return (
    <div id='myModal' className='modal' onClick={handleCloseModal}>
      <div className='modal__content'>
        <div className='modal-close' onClick={handleCloseModal}>
          <span className='modal-close__span'>&times;</span>
        </div>
        <div className='modal-text'>{modalMsg}</div>
      </div>
    </div>
  );
}

export default Modal;
