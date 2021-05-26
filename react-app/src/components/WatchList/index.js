import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWl, delFromWl } from '../../store/watchlist'
import styles from './watchList.module.css'
import { NavLink } from 'react-router-dom';


const WatchList = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const watchlist = useSelector(state => state.watchlist)
  const coins = useSelector(state => state.coins)
  const dbCoins = useSelector(state => state.dbcoins)

  const newWL = [];

  const coinVal = Object.values(coins)
  const wlVal = Object.values(watchlist)

  for (let i = 0; i < coinVal.length; i++) {
    for (let j = 0; j < wlVal.length; j++) {
      if (coinVal[i].symbol == wlVal[j].abrv) {
        newWL.push(coinVal[i])
      }
    }
  }

  useEffect(() => {
    dispatch(getAllWl())
  }, [dispatch])

  useEffect(() => {

  }, [coins])

  const deleteCrypto = (name) => {
    const id = dbCoins[name].id
    dispatch(delFromWl(id))
  }


  return (
    <>
      <div className={styles.header}><h3>Watchlist</h3>
        {
          newWL?.map(crypto => (
            <div className={styles.outerDiv}>
              <div className={styles.title}>
                <h4><NavLink to={`/cryptos/${crypto.id}`}>{crypto.symbol}</NavLink></h4>
              </div>
              <div className={styles.innerDiv} >
                <div className={styles.info}>
                  <p>
                    {(crypto.current_price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </p>
                  <p className={crypto.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                    {(crypto.price_change_percentage_24h).toLocaleString()}%
                  </p>
                </div>
              </div>
              <div className={styles.del}>
                <img className={styles.xImg} src="https://cdn.xxl.thumbs.canstockphoto.com/cross-sign-red-element-cross-sign-element-red-x-icon-isolated-on-white-background-simple-mark-clip-art-vector_csp44320065.jpg" value={crypto.name} onClick={e => deleteCrypto(crypto.name)} />
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default WatchList