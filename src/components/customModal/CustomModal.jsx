import React, { useEffect } from 'react';
import Modal from 'react-modal';
import "./CustomModal.css"
Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div className='modalBox'>
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Notification"
      className="Modal"
    >
      <h2>{message.title}</h2>
      <p>{message.body}</p>
    </Modal>
    </div>
  );
};

export default CustomModal;
