import React, { useState } from 'react';
import Modal from "react-modal";
import Sell from './index'

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 12,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "10px",
    maxHeight: "800px",
    padding: "20px",
    border: "none",
  },
};

Modal.setAppElement("#root");

const SellButton = ({ crypto }) => {

  const [modalIsOpenSell, setIsOpenSell] = useState(false);

  function openModalSell() {
    setIsOpenSell(true);
  }

  function closeModalSell() {
    setIsOpenSell(false);
  }

  return (
    <>
      <button className="btn btn-danger" onClick={openModalSell}>Sell</button>
      <Modal
        isOpen={modalIsOpenSell}
        onRequestClose={closeModalSell}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Sell
          onClick={closeModalSell}
          crypto={crypto}
          close={closeModalSell}
        />
      </Modal>
    </>
  )
}

export default SellButton