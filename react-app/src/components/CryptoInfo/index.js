import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { setDbCoin } from '../../store/dbcoins'
import { setOneCoin } from '../../store/onecoin'
import { addToWL } from '../../store/watchlist'
import PortfolioForm from '../PortfolioForm/index'
import styles from './cryptoInfo.module.css'
import WatchList from '../WatchList/index'
import Modal from "react-modal";

{/* from stack overflow https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings */ }

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 5,
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

const CryptoInfo = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const coin = useSelector(state => state.onecoin)
  const mktCoins = useSelector(state => state.coins)
  const dbCoins = useSelector(state => state.dbcoins)
  const user = useSelector(state => state.session?.user)
  const [modalIsOpenBuy, setIsOpenBuy] = useState(false);

  const coinData = mktCoins[name]

  function openModalBuy() {
    setIsOpenBuy(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalBuy() {
    setIsOpenBuy(false);
  }

  useEffect(() => {
    dispatch(setOneCoin(name))
    dispatch(setDbCoin())
  }, [dispatch, name])

  useEffect(() => {

  }, [mktCoins])

  const handleClick = (e) => {
    e.preventDefault()
    const crypto = dbCoins[coinData?.name]
    const crypto_id = crypto.id
    const data = {
      crypto_id,
      user_id: user.id
    }
    dispatch(addToWL(data))
  }
  return (
    <div className={styles.topDiv}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.titleDiv}><img src={coin?.image?.small} /></div>
            <div className={styles.titleDiv}><h1>{coin.name}</h1></div>
          </div>
          <div className={styles.priceItems}>
            <div>{coin?.name} Price ({coin?.symbol})</div>
            <div className={styles.price}>
              <h2>
                {(coinData?.current_price)?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </h2>
              <div className={coinData?.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                {(coinData?.price_change_percentage_24h)?.toLocaleString()}%
            </div>
            </div>
          </div>
        </div>
        {user && <div className={styles.btnDiv}>
          <div>
            <button className="btn btn-info" onClick={handleClick}>Add To WatchList</button>
          </div>
          <div>
            <button
              className="btn btn-success"
              onClick={openModalBuy}
            >
              Buy Crypto
            </button>
            <Modal
              isOpen={modalIsOpenBuy}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalBuy}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <PortfolioForm
                setIsOpenBuy={setIsOpenBuy}
                openModalBuy={openModalBuy}
                closeModalBuy={closeModalBuy}
              />
            </Modal>
          </div>
        </div>}
        <div className={styles.descript}>
          <p dangerouslySetInnerHTML={{ __html: coin?.description?.en }} />
        </div>
      </div>
      <div>
        <div className={styles.right}>
          <div className={styles.comp}>
            <h4>{coin?.name}</h4>
          </div>
          <div className={styles.ex}>
            <div>Price : </div>
            <div>
              <div>{(coinData?.current_price)?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}</div>
            </div>
          </div>
          <div className={styles.ex}>
            <div>Price Change 24h : </div>
            <div>
              <div className={coinData?.price_change_24h >= 0 ? styles.greenFont : styles.redFont}>
                {(coinData?.price_change_24h)?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
              <div className={coinData?.price_change_percentage_24h >= 0 ? styles.greenFont : styles.redFont}>
                {(coinData?.price_change_percentage_24h)?.toLocaleString()}%
              </div>
            </div>
          </div>
          <div className={styles.ex}>
            <div>24h Low / 24h High : </div>
            <div>
              <div>{(coinData?.low_24h)?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })} /</div>
              <div>{(coinData?.high_24h)?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}</div>
            </div>
          </div>
          <div className={styles.ex}>
            <div>Trading Volume 24h: </div>
            <div>{(coinData?.total_volume)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}</div>
          </div>
          <div className={styles.ex}>
            <div>Volume / Market Cap: </div>
            <div>{(coinData?.total_volume / coinData?.market_cap).toFixed(5)}</div>
          </div>
          <div className={styles.ex}>
            <div>Market Rank : </div>
            <div>{coinData?.market_cap_rank}</div>
          </div>
          <div className={styles.ex}>
            <div>Market Cap: </div>
            <div>{(coinData?.market_cap)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}</div>
          </div>
          <div className={styles.ex}>
            <div>Circulating Supply: </div>
            <div>{(coinData?.circulating_supply)?.toLocaleString()}</div>
          </div>
          <div className={styles.ex}>
            <div>Total Supply: </div>
            <div>{(coinData?.total_supply)?.toLocaleString()}</div>
          </div>
        </div>
        {
          user &&
          <div>
            <WatchList />
          </div>
        }
      </div>

    </div>
  )
}

export default CryptoInfo