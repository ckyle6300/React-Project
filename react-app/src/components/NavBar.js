import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { setCoin } from '../store/coins';
import Search from '../components/Search/index';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import styles from './navbar.module.css'

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
    borderRadius: "10px",
    maxHeight: "800px",
    padding: "20px",
    backgroundColor: 'var(--darkgreen)',
    border: "none",
  },
};

Modal.setAppElement("#root");

const NavBar = ({ authenticated, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  dispatch(setCoin())
  const coinSetter = setInterval(() => dispatch(setCoin()), 30000);

  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
  const [modalIsOpenSearch, setIsOpenSearch] = useState(false);

  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function openModalSignUp() {
    setIsOpenSignUp(true);
  }

  function openModalSearch() {
    setIsOpenSearch(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalLogin() {
    setIsOpenLogin(false);
  }

  function closeModalSignUp() {
    setIsOpenSignUp(false);
  }

  function closeModalSearch() {
    setIsOpenSearch(false);
  }

  return (
    <div className={styles.outerDiv}>
      <NavLink to="/" exact={true} activeClassName="active">
        <img src='https://shawn-wikoff.webnode.com/_files/200000007-604686140d/Wikoff%20Shawn%20bitcoin.jpg' className={styles.img} />
      </NavLink>
      {user ?
        <>
          <div className={styles.buttonDiv}>
            <NavLink to="/profile" exact={true} activeClassName="active">
              <button className="btn btn-success">
                Profile
              </button>
            </NavLink>
          </div>
          <div className={styles.buttonDiv}>
            <LogoutButton />
          </div>
        </>
        : " "}
      {user ? " " :
        <>
          <div className={styles.buttonDiv}>
            <button class="btn btn-info" onClick={openModalLogin}>
              Login
            </button>
          </div>
          <div className={styles.buttonDiv}>
            <Modal
              isOpen={modalIsOpenLogin}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalLogin}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <LoginForm
                setIsOpenLogin={setIsOpenLogin}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                openModalSignUp={openModalSignUp}
                closeModalLogin={closeModalLogin}
              />
            </Modal>
          </div>
          <div className={styles.buttonDiv}>
            <button
              onClick={openModalSignUp}
              className="btn btn-secondary"
            >
              Sign Up
                </button>
          </div>
          <div>
            <Modal
              isOpen={
                authenticated === true
                  ? false
                  : modalIsOpenSignUp
              }
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalSignUp}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <SignUpForm
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                closeModalSignUp={closeModalSignUp}
                openModalLogin={openModalLogin}
              />
            </Modal>
          </div>
        </>
      }
      <div className={styles.buttonDiv}>
        <button
          className="btn btn-success"
          onClick={openModalSearch}
        >
          Search Crypto
        </button>
        <Modal
          isOpen={modalIsOpenSearch}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalSearch}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Search
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            onClick={closeModalSearch}
          />
        </Modal>
      </div>

    </div>
  );
}

export default NavBar;
