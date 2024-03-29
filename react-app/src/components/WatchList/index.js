import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWl, delFromWl } from '../../store/watchlist'
import styles from './watchList.module.css'
import { NavLink } from 'react-router-dom';
import { setDbCoin } from '../../store/dbcoins';


const WatchList = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const watchlist = useSelector(state => state.watchlist)
  const coins = useSelector(state => state.coins)
  const dbCoins = useSelector(state => state.dbcoins)

  const newWL = Object.values(watchlist);

  useEffect(() => {
    dispatch(getAllWl())
    dispatch(setDbCoin())
  }, [dispatch])

  useEffect(() => {

  }, [coins])

  const deleteCrypto = (name) => {
    const id = dbCoins[name]?.id
    dispatch(delFromWl(id))
  }

  return (
    <>
      <div className={styles.header}><h3>Watchlist</h3>
        {
          newWL?.map(crypto => (
            <div className={styles.outerDiv}>
              <div className={styles.title}>
                <h4><NavLink to={`/cryptos/${crypto.storeId}`}>{crypto.abrv}</NavLink></h4>
              </div>
              <div className={styles.innerDiv} >
                <div className={styles.info}>
                  <p>
                    {(coins[crypto?.storeId]?.current_price)?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </p>
                  <p className={coins[crypto?.storeId]?.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                    {(coins[crypto?.storeId]?.price_change_percentage_24h)?.toLocaleString()}%
                  </p>
                </div>
              </div>
              <div className={styles.del}>
                <img className={styles.xImg} src="https://cdn.xxl.thumbs.canstockphoto.com/cross-sign-red-element-cross-sign-element-red-x-icon-isolated-on-white-background-simple-mark-clip-art-vector_csp44320065.jpg" value={crypto.storeId} onClick={e => deleteCrypto(crypto.storeId)} />
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default WatchList