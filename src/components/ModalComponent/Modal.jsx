import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, setFixWidth }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content w-[500px]" >
            <button className="close-button" onClick={onClose}>
              <span>&times;</span>
            </button>
            {children}
          </div>
        </div >
      )}
    </>
  );
};

export default Modal;
